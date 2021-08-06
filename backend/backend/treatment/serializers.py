from users.serializers import DoctorModelSerializer, PatientModelSerializer
from users.models import DoctorModel, PatientModel
from rest_framework import serializers
from treatment.models import MedicinesModel, PatientParameterModel, PrecautionModel, RequestMedicinesModel, RequestPrecautionModel, RequestSuggestionModel, SymptomsModel,RequestsModel,PatientSymptomsModel,ParameterModel,DoctorMedicinesModel,DoctorPrecautionModel,SuggestionModel,DoctorSuggestionModel
from treatment.serializers import PatientModelSerializer,DoctorModelSerializer

class SymptomModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=SymptomsModel
        fields=('__all__')

class PatientSymptomModelSerializer(serializers.ModelSerializer):
    symptom=SymptomModelSerializer()
    class Meta:
        model=PatientSymptomsModel
        fields=('__all__')

class PatientParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientParameterModel
        fields=('__all__')
    
class RequestModelSerializer(serializers.ModelSerializer):
    patient=PatientModelSerializer()
    doctor=DoctorModelSerializer()
    symptoms=serializers.SerializerMethodField('get_symptoms')
    parameters=serializers.SerializerMethodField('get_params')
    medicines=serializers.SerializerMethodField('get_meds')
    precautions=serializers.SerializerMethodField('get_precautions')
    suggestion=serializers.SerializerMethodField('get_suggestion')


    def get_meds(self,request):
        print(request.status)
        if request.status is "0":
            medicines=RequestMedicinesModel.objects.filter(request=request).values('medicine')
            temp=[]
            for medicine in medicines:
                print(medicine)
                med=DoctorMedicineModelSerializer(DoctorMedicinesModel.objects.filter(medicine=medicine['medicine']),many=True).data
                temp.append(med)
            print(temp)
            return temp 
        else:
            print("in else")
            return None

    def get_precautions(self,request):
        if(request.status is "0"):
            return RequestPrecautionSerializer(RequestPrecautionModel.objects.filter(request=request),many=True).data
        else:
            return None
        
    def get_suggestion(self,request):
        if(request.status is "0"):
            return RequestSuggestionSerializer(RequestSuggestionModel.objects.filter(request=request),many=True).data
        else:
            return None

    def get_symptoms(self,request):
        print("insiddd")
        print(PatientSymptomsModel.objects.filter(request_id=request).exists())
        if PatientSymptomsModel.objects.filter(request_id=request).exists():
            print(request)
            print(PatientSymptomModelSerializer(PatientSymptomsModel.objects.filter(request_id=request),many=True).data)
            return PatientSymptomModelSerializer(PatientSymptomsModel.objects.filter(request_id=request),many=True).data
        else:
            return None
    
    def get_params(self,request):
        if PatientParameterModel.objects.filter(request_id=request).exists():
            print("yes exists")
            return PatientParameterSerializer(PatientParameterModel.objects.get(request_id=request)).data

    def save(self,patient,doctor,status):
        request=RequestsModel.objects.create(patient=patient,doctor=doctor,status=status)
        request.save()
        return request


    class Meta:
        model=RequestsModel
        fields=('__all__')

class MedicineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=MedicinesModel
        fields=('__all__')

class DoctorMedicineModelSerializer(serializers.ModelSerializer):
    medicine=MedicineModelSerializer()
    class Meta:
        model=DoctorMedicinesModel
        fields=('medicine','times','habbit')


class PrecautionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=PrecautionModel
        fields=('__all__')

class DoctorPrecationModelSerializer(serializers.ModelSerializer):
    precaution=PrecautionModelSerializer()
    class Meta:
        model=DoctorPrecautionModel
        fields=('precaution',)

class SuggestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=SuggestionModel
        fields=('__all__')

class DoctorSuggestionModelSerializer(serializers.ModelSerializer):
    suggestion=SuggestionModelSerializer()
    class Meta:
        model=DoctorSuggestionModel
        fields=('suggestion',)

class RequestMedicineSerializer(serializers.ModelSerializer):
    medicine=MedicineModelSerializer()
    class Meta:
        model=RequestMedicinesModel
        fields=('__all__')

class RequestPrecautionSerializer(serializers.ModelSerializer):
    precaution=PrecautionModelSerializer()
    class Meta:
        model=RequestPrecautionModel
        fields=('__all__')
    
class RequestSuggestionSerializer(serializers.ModelSerializer):
    suggestion=SuggestionModelSerializer()
    class Meta:
        model=SuggestionModel
        fields=('suggestion',)