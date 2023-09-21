<?php

$num_students = $_GET['keyword'];
$Location = $_GET['Location'];
$SocioEconomicStatus = $_GET['SocioEconomicStatus'];

$pythonScript = "python E:\dropout\assets\script\script.py";
$descriptors = [
    0 => ['pipe', 'r'],
    1 => ['pipe', 'w'],
    2 => ['pipe', 'w'],
];

$process = proc_open($pythonScript, $descriptors, $pipes);

if (is_resource($process)) {

    fwrite($pipes[0], $num_students);
    fclose($pipes[0]);

    $output = stream_get_contents($pipes[1]);
    fclose($pipes[1]);

    proc_close($process);

    $student_data = json_decode($output);

    if ($student_data === null) {
        die('Error parsing JSON data from Python.');
    }

    $genderData = ['Male' => 0, 'Female' => 0];
    $dropoutData = ['Gender' => ['Male' => 0, 'Female' => 0], 'Dropout' => ['Dropout' => 0, 'Not Dropout' => 0]];
    $mealData = ['Midday Meal' => 0, 'No Midday Meal' => 0];
    $socioeconomicData = ['High' => 0, 'Low' => 0, 'Medium' => 0];
    $areaData = ['Rural' => 0, 'Urban' => 0];

    foreach ($student_data as $student) {
        if ($Location == $student->Student_Area && $SocioEconomicStatus == $student->Socioeconomic_Status) {
            if ($student->Gender == 'Male') {
                $genderData['Male']++;

                if ($student->Dropout == '1') {
                    $dropoutData['Gender']['Male']++;
                    $dropoutData['Dropout']['Dropout']++;
                } else {
                    $dropoutData['Dropout']['Not Dropout']++;
                }
            } elseif ($student->Gender == 'Female') {
                $genderData['Female']++;

                if ($student->Dropout == '1') {
                    $dropoutData['Gender']['Female']++;
                    $dropoutData['Dropout']['Dropout']++;
                }
            }

            if ($student->Midday_Meal == 'Yes') {
                $mealData['Midday Meal']++;
            } elseif ($student->Midday_Meal == 'No') {
                $mealData['No Midday Meal']++;
            }

            if ($student->Socioeconomic_Status == 'High') {
                $socioeconomicData['High']++;
            } else if ($student->Socioeconomic_Status == 'Low') {
                $socioeconomicData['Low']++;
            } else {
                $socioeconomicData['Medium']++;
            }
            if ($student->Student_Area == 'Rural') {
                $areaData['Rural']++;
            } else {
                $areaData['Urban']++;
            }
        }
    }

    $responseData = [
        'genderData' => $genderData,
        'dropoutData' => $dropoutData,
        'mealData' => $mealData,
        'socioeconomicData' => $socioeconomicData,
        'areaData' => $areaData,
    ];

    header('Content-Type: application/json');
    echo json_encode($responseData);
} else {
    echo "Error starting Python process.";
}