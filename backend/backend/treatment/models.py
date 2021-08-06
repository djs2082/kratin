from django.db import models
from django.db.models.fields import CharField
from users.models import PatientModel,DoctorModel

# Create your models here.
status_choices=(("0","RESOLVED"),("1","PENDING"),("2","NOT ASSIGNED"))

class SymptomsModel(models.Model):
    name=models.CharField(max_length=200)

    def __str__(self):
        return self.name

class ParameterModel(models.Model):
    name=models.CharField(max_length=100)

    def __str__(self):
        return self.name

class RequestsModel(models.Model):
    patient=models.ForeignKey(PatientModel,on_delete=models.SET_NULL,null=True)
    doctor=models.ForeignKey(DoctorModel,on_delete=models.SET_NULL,null=True)
    status=models.CharField(max_length=20,choices=status_choices)
    datetime=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

class PatientSymptomsModel(models.Model):
    request_id=models.ForeignKey(RequestsModel,on_delete=models.SET_NULL,null=True)
    symptom=models.ForeignKey(SymptomsModel,on_delete=models.SET_NULL,null=True)
    comment=models.TextField(max_length=500)

    def __str__(self):
        if(self.request_id is not None):
            return self.request_id.patient.user.first_name+" "+self.request_id.patient.user.last_name
        else:
            return "request deleted"

class PatientParameterModel(models.Model):
    request_id=models.ForeignKey(RequestsModel,on_delete=models.SET_NULL,null=True)
    spo2=models.IntegerField(default=0,max_length=20)
    heartbeat=models.IntegerField(default=0 ,max_length=20)
    temperature=models.FloatField(default=0.0)

    def __str__(self):
        if(self.request_id is not None):
            return self.request_id.patient.user.username
        else:
            return "request deleted"

class MedicinesModel(models.Model):
    name=models.CharField(max_length=200)
    def __str__(self):
        return self.name

class DoctorMedicinesModel(models.Model):
    doctor=models.ForeignKey(DoctorModel,on_delete=models.SET_NULL,null=True)
    medicine=models.ForeignKey(MedicinesModel,on_delete=models.SET_NULL,null=True)
    times=models.CharField(max_length=200,null=True)
    habbit=models.CharField(max_length=200,null=True)
    def __str__(self):
        return self.doctor.user.first_name+" "+self.medicine.name

class RequestMedicinesModel(models.Model):
    request=models.ForeignKey(RequestsModel,on_delete=models.CASCADE)
    medicine=models.ForeignKey(MedicinesModel,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return str(self.request.id)

class PrecautionModel(models.Model):
    name=models.CharField(max_length=200)
    def __str__(self):
        return self.name

class DoctorPrecautionModel(models.Model):
    doctor=models.ForeignKey(DoctorModel,on_delete=models.SET_NULL,null=True)
    precaution=models.ForeignKey(PrecautionModel,on_delete=models.CASCADE)
    def __str__(self):
        return self.precaution.name

class RequestPrecautionModel(models.Model):
    request=models.ForeignKey(RequestsModel,on_delete=models.CASCADE)
    precaution=models.ForeignKey(PrecautionModel,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return self.precaution.name


class SuggestionModel(models.Model):
    name=models.CharField(max_length=200)
    def __str__(self):
        return self.name


class DoctorSuggestionModel(models.Model):
    doctor=models.ForeignKey(DoctorModel,on_delete=models.SET_NULL,null=True)
    suggestion=models.ForeignKey(SuggestionModel,on_delete=models.CASCADE)
    def __str__(self):
        return self.suggestion.name

class RequestSuggestionModel(models.Model):
    request=models.ForeignKey(RequestsModel,on_delete=models.CASCADE)
    suggestion=models.ForeignKey(SuggestionModel,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return "deleted"

    




