import pandas as pd
import numpy as np
import json

np.random.seed(42)

num_students = int (input())

# Define different dropout probabilities for male and female students
male_dropout_prob = 0.15  # Adjust this as needed
female_dropout_prob = 0.30  # Adjust this as needed

data = {
    'StudentID': range(1, num_students + 1),
    'Gender': np.random.choice(['Female', 'Male'], num_students),
    'Age': np.random.randint(18, 24, num_students),
    'Grade_Average': np.random.uniform(60, 100, num_students),
    'Socioeconomic_Status': np.random.choice(['Low', 'Medium', 'High'], num_students),
    'Student_Area': np.random.choice(['Urban', 'Rural'], num_students),
}

# Calculate the dropout probability based on gender
data['Dropout'] = np.where(data['Gender'] == 'Male',
                           np.random.choice([1, 0], num_students, p=[male_dropout_prob, 1 - male_dropout_prob]),
                           np.random.choice([0, 1], num_students, p=[female_dropout_prob, 1 - female_dropout_prob]))

# Calculate Midday_Meal based on gender and age
data['Midday_Meal'] = np.where((np.random.choice([0, 1], num_students) == 1) | ((data['Gender'] == 'Female') & (data['Age'] < 18)), 'No', 'Yes')

df = pd.DataFrame(data)

df['Gender'] = df['Gender'].astype(str)
df['Dropout'] = df['Dropout'].astype(str)
df['Student_Area'] = df['Student_Area'].astype(str)
df['Midday_Meal'] = df['Midday_Meal'].astype(str)

json_data = df.to_json(orient='records')

with open('student_data.json', 'w') as json_file:
    json.dump(json.loads(json_data), json_file, indent=4)

print(json_data)
