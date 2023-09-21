# eduGuardian

---

## Overview

When we talk about education in India, it's not just about numbers and statistics; it's about the future of our country, the dreams of millions of children, and the promise of a brighter tomorrow. But the reality is, we've been grappling with a significant issue - high dropout rates. Poverty, social factors, and economic challenges have forced many young minds to step away from the path of education. It's a problem that's been haunting our educational landscape for far too long.

**eduGuardian** is here to change that. It's not just another piece of software; it's a game-changer, a real revolution in the making. Imagine a future where no child is left behind, where every student gets a fair shot at education, regardless of their background.

### Key Features

- Identifies students at risk of dropping out.
- Recommends tailored interventions for struggling students.
- Customizes strategies for different regions and gender-based needs.
- Addresses caste-based disparities.
- Early detection of problems by analyzing dropout rates by age and grade.

## Use Cases

Our system does some impressive stuff – it looks at schools, areas, gender, and ages to figure out how to help. This means more students graduate, inequalities get smaller, and education gets brighter.

## Dependencies

Before you get started, ensure you have the following dependencies installed:

- [Python 3](https://www.python.org/downloads/)
- [PHP](https://www.php.net/manual/en/install.php)
- [Pandas](https://pandas.pydata.org/pandas-docs/stable/getting_started/install.html)
- [Matplotlib](https://matplotlib.org/stable/users/installing.html)
- [Scikit-Learn](https://scikit-learn.org/stable/install.html)
- [jQuery](https://jquery.com/download/)
- [NumPy](https://numpy.org/install/)
- [Apache HTTP Server](https://httpd.apache.org/download.cgi)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Technical Details

### Data Model

We use Python and R to create a data model that predicts student dropout rates based on various factors like gender, socio-economic status, rural/urban settings, and more. The model analyzes a vast database of student profiles and generates valuable insights.

### Script Execution

The core of our system lies in `script.py`, which processes the entire student database and produces data insights. These insights are presented through a graphical dashboard created using technologies like jQuery and Matplotlib.

### Server-Side

Our server-side logic is implemented in `api.php`, which serves as the bridge between the data model and the web interface. To start the project from the root, use the command:

```shell
php -S localhost:port
```

## Installation

### Python Setup

1. **Python 3**: If not already installed, download and install Python 3 from the [official Python website](https://www.python.org/downloads/).

2. **Pandas, Matplotlib, and Scikit-Learn**: Install the necessary Python packages using pip:

   ```shell
   pip install pandas matplotlib scikit-learn numpy
   ```

### PHP and Apache Setup

3. **PHP and Apache**: Set up PHP and Apache HTTP Server. You can follow installation guides for [PHP](https://www.php.net/manual/en/install.php) and [Apache HTTP Server](https://httpd.apache.org/download.cgi).

### Additional Dependencies

4. **jQuery**: Download the jQuery library from the [official website](https://jquery.com/download/) and include it in your project's HTML files.

5. **MongoDB**: Install MongoDB using the instructions provided in the [MongoDB documentation](https://www.mongodb.com/try/download/community).

## Getting Started

1. Follow the [Python Setup](#python-setup), [PHP and Apache Setup](#php-and-apache-setup), and [Additional Dependencies](#additional-dependencies) steps.

2. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/somritdasgupta/eduGuardian.git
   cd eduGuardian
   ```

3. Start the Apache server and the PHP web server:

   ```shell
   php -S localhost:8080
   ```

4. Access the project by opening a web browser and navigating to `http://localhost:8080`.

5. Explore the dashboard and use the insights for research and decision-making.

## License
This project is private and confidential. Unauthorized access, copying, or distribution is strictly prohibited.

All rights reserved.

