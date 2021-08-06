from users.models import DoctorModel, PatientModel
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','email']

class DoctorModelSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=DoctorModel
        fields=['id','user','address','qualification','mobile']


class PatientModelSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=PatientModel
        fields=['id','user','address','age','mobile','premeds']


