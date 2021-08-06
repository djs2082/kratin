# kratin
kratin drive assignment for old age people medical help

# Flow

1)Admin registers Doctor and Patient  
2)Patient can check the symptoms he/she is experiencing with comments.  
3)Patient can provide other details like spo2, Heartbeat,Temperature and Premedical conditions.  
3)After submitting, reuest goes to the doctor available on the same pincode he/she is living.  
4)Doctor gets overview of provided details and provide prescription, precautions and suggestion.  
5)The provided treatment goes to the patient dashboared.  
6)for each update doctor as well as patient is notified through email.  

# Extra Features

1)new symptoms on dashboard can be added easly by admin.  
2)patient can visit previous request along with their status.  
3)for every new medicine doctor provides, it is stored in database for future recommendation along with prescription.  
5)similarly, suggestion and precautions are also stored and can be shown as redcommendation in frontend.  

# Technologies

1)Python3  
2)Django Rest Framework  
3)React JS Framework
4)Docker

## Installation

This application is containerized using Docker.
if you have docker-compose installed on your machine. below command will start project on your machine by hadling all the dependencies.  
Run this command in root directory of project.

```bash
docker-compose up
```
if you don't have docker-compose installed on your machine. then you can start project with below process


```bash
npm install
sudo npm start
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.  
dilipjoshis98@gmail.com  
8975427620  

## License
[MIT](https://choosealicense.com/licenses/mit/)
