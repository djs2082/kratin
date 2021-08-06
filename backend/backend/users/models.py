from django.db import models
from django.conf import settings
from rest_framework.authtoken.models import Token
import datetime
from django.utils.timezone import now,localtime
from django.core.validators import FileExtensionValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

class PatientModel(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True,blank=True)
	age=models.IntegerField()
	premeds=models.TextField(max_length=500)
	mobile=models.CharField(max_length=10)
	address=models.TextField(max_length=500)
	pincode=models.CharField(max_length=6)


	def __str__(self):
		return(self.user.first_name+" "+self.user.last_name)

class DoctorModel(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True,blank=True)
	qualification=models.CharField(max_length=20)
	mobile=models.CharField(max_length=10)
	address=models.TextField(max_length=500)
	pincode=models.CharField(max_length=6)


	def __str__(self):
		return(self.user.first_name+" "+self.user.last_name)

@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
	if created:
		Token.objects.create(user=instance)

