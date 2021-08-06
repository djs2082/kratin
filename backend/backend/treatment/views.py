from django.db.models.query_utils import PathInfo
from users.serializers import DoctorModelSerializer, PatientModelSerializer
from users.models import DoctorModel, PatientModel
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from treatment.models import MedicinesModel, PrecautionModel, RequestMedicinesModel, RequestPrecautionModel, RequestSuggestionModel, RequestsModel, SuggestionModel, SymptomsModel, PatientSymptomsModel,ParameterModel,PatientParameterModel,DoctorMedicinesModel,DoctorPrecautionModel,DoctorSuggestionModel
from treatment.serializers import DoctorMedicineModelSerializer, SymptomModelSerializer,RequestModelSerializer,DoctorPrecationModelSerializer,DoctorSuggestionModelSerializer
from requirements import success,error
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.
@api_view(['GET',])
@permission_classes([IsAuthenticated])
def get_symptoms(request):
    try:
        symptoms=SymptomsModel.objects.all()
        print(symptoms)
        serializer  = SymptomModelSerializer(symptoms,many=True)
        print(serializer.data)
        response = success.APIResponse(200, serializer.data).respond()
    except Exception as e:
        response = error.APIErrorResponse(400, str(e)).respond()
    finally:
        return Response(response)

@api_view(['GET',])
@permission_classes([IsAuthenticated])
def get_medicines(request):
    try:
        doctor=DoctorModel.objects.get(user=request.user)
        medicines=DoctorMedicinesModel.objects.filter(doctor=doctor)
        serializer  = DoctorMedicineModelSerializer(medicines,many=True)
        response = success.APIResponse(200, serializer.data).respond()
    except Exception as e:
        response = error.APIErrorResponse(400, str(e)).respond()
    finally:
        return Response(response)


@api_view(['GET',])
@permission_classes([IsAuthenticated])
def get_precautions(request):
    try:
        doctor=DoctorModel.objects.get(user=request.user)
        precautions=DoctorPrecautionModel.objects.filter(doctor=doctor)
        serializer  = DoctorPrecationModelSerializer(precautions,many=True)
        response = success.APIResponse(200, serializer.data).respond()
    except Exception as e:
        response = error.APIErrorResponse(400, str(e)).respond()
    finally:
        return Response(response)

@api_view(['GET',])
@permission_classes([IsAuthenticated])
def get_suggestions(request):
    try:
        doctor=DoctorModel.objects.get(user=request.user)
        suggestions=DoctorSuggestionModel.objects.filter(doctor=doctor)
        serializer  = DoctorSuggestionModelSerializer(suggestions,many=True)
        response = success.APIResponse(200, serializer.data).respond()
    except Exception as e:
        response = error.APIErrorResponse(400, str(e)).respond()
    finally:
        return Response(response)


@api_view(['GET',])
@permission_classes([IsAuthenticated])
def get_requests(request):
    try:
        if(PatientModel.objects.filter(user=request.user).exists()):
            patient=PatientModel.objects.get(user=request.user)
            patient_request=RequestsModel.objects.filter(patient=patient)
            serializer  = RequestModelSerializer(patient_request,many=True)
            response = success.APIResponse(200, serializer.data).respond()
        elif(DoctorModel.objects.filter(user=request.user).exists()):
            doctor=DoctorModel.objects.get(user=request.user)
            doctor_request=RequestsModel.objects.filter(doctor=doctor)
            serializer=RequestModelSerializer(doctor_request,many=True)
            response = success.APIResponse(200, serializer.data).respond()
        else:
            response = error.APIErrorResponse(400, "Invalid User").respond()


    except Exception as e:
        response = error.APIErrorResponse(400, str(e)).respond()
    finally:
        return Response(response)

@api_view(['POST',])
@permission_classes([IsAuthenticated])
def assign_doctor(request):
    try:
        patient=PatientModel.objects.get(user=request.user)
        patient_pincode=patient.pincode
        print(patient_pincode)
        print(request.data)
        try:
            if(DoctorModel.objects.filter(pincode=patient_pincode).exists()):
                doctor=DoctorModel.objects.get(pincode=patient_pincode)
                data=RequestsModel.objects.create(patient=patient,doctor=doctor,status=1)
                data.save()
            else:
                data=RequestsModel.objects.create(patient=patient,doctor=None,status=2)
                data.save()
            data=RequestModelSerializer(data).data
            request_id=data['id']
            response = success.APIResponse(201, "You are assigned a doctor {}".format(doctor.user.first_name+" "+doctor.user.last_name)).respond()
        except Exception as e :
            response = success.APIResponse(201, "You are Not assigned doctor for now, we are looking doctor for you").respond()
        finally:
            request_model=RequestsModel.objects.get(id=request_id)
            for symptom in request.data['symptoms']:
                if(symptom['status']):
                    symp=SymptomsModel.objects.get(id=symptom['id'])
                    data=PatientSymptomsModel.objects.create(request_id=request_model,symptom=symp,comment=symptom['comment'])
                    data.save()
            params=PatientParameterModel.objects.create(request_id=request_model,spo2=request.data['spo2'],heartbeat=request.data['heartbeat'],temperature=request.data['temperature'])
            params.save()
            PatientModel.objects.filter(user=request.user).update(premeds=request.data['premeds'])
    except Exception as e:
        response = error.APIErrorResponse(400,str(e)).respond()
    finally:
        return Response(response) 

@api_view(['POST',])
@permission_classes([IsAuthenticated])
def assign_treatment(request):
    try:
        medicines=request.data['patient_medicines']
        for medicine in medicines:
            print(medicine)
            if(not MedicinesModel.objects.filter(name=medicine['medicine_name']).exists()):
                medicine_save=MedicinesModel.objects.create(name=medicine['medicine_name'])
                medicine_save.save()
                doctormedicine=DoctorMedicinesModel(doctor=DoctorModel.objects.get(user=request.user),medicine=medicine_save,times=medicine['medicine_times'],habbit=medicine['medicine_habbit'])
                doctormedicine.save()
            
            medicine_save=MedicinesModel.objects.get(name=medicine['medicine_name'])
            request_patient=RequestsModel.objects.get(id=request.data['patient']['id'])
            print(request_patient)
            print(medicine_save)
            request_medicine=RequestMedicinesModel.objects.create(request=request_patient,medicine=medicine_save)
            request_medicine.save()
        precautions=request.data['patient_precautions']
        for precaution in precautions:
            print(precaution)
            if(not PrecautionModel.objects.filter(name=precaution['name']).exists()):
                precaution_save=PrecautionModel.objects.create(name=precaution['name'])
                precaution_save.save()
                doctorprecaution=DoctorPrecautionModel(doctor=DoctorModel.objects.get(user=request.user),precaution=precaution_save)
                doctorprecaution.save()
            
            precaution_save=PrecautionModel.objects.get(name=precaution['name'])
            request_patient=RequestsModel.objects.get(id=request.data['patient']['id'])
            print(request_patient)
            print(medicine_save)
            request_precaution=RequestPrecautionModel.objects.create(request=request_patient,precaution=precaution_save)
            request_precaution.save()

        if(not SuggestionModel.objects.filter(name=request.data['patient_suggestion']).exists()):
                suggestion_save=SuggestionModel.objects.create(name=request.data['patient_suggestion'])
                suggestion_save.save()
                doctorsuggestion=DoctorSuggestionModel(doctor=DoctorModel.objects.get(user=request.user),suggestion=suggestion_save)
                doctorsuggestion.save()
        suggestion_save=SuggestionModel.objects.get(name=request.data['patient_suggestion'])
        request_patient=RequestsModel.objects.get(id=request.data['patient']['id'])
        print(request_patient)
        print(medicine_save)
        request_suggestion=RequestSuggestionModel.objects.create(request=request_patient,suggestion=suggestion_save)
        request_suggestion.save()
        RequestsModel.objects.filter(id=request.data['patient']['id']).update(status=0)
        response = success.APIResponse(201, "Treatment is provided to patient successfully").respond()

    except Exception as e:
        response = error.APIErrorResponse(400,str(e)).respond()
    return Response(response)


