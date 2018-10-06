# Hackathon for hope

## REST interface

### All patients

get /patients/

e.g. [https://hackthishelpkids-matt.appspot.com/patients/](https://hackthishelpkids-matt.appspot.com/patients/)

### Patient information

get /patients/lastname/firstname

e.g. [https://hackthishelpkids-matt.appspot.com/patients/lang/manuel](https://hackthishelpkids-matt.appspot.com/patients/lang/manuel)

### Add patient

post /patient/add

body parameters:
- firstname
- lastname
- dateofbirth
- medicine
- recommendations

### All medicine

get /medicine/

e.g. [https://hackthishelpkids-matt.appspot.com/medicine/](https://hackthishelpkids-matt.appspot.com/medicine/)

### Medicine information

get /medicine/name

e.g. [https://hackthishelpkids-matt.appspot.com/medicine/clarithromicin](https://hackthishelpkids-matt.appspot.com/medicine/clarithromicin)

### Add medicine

post /medicine/add

body parameters:
- name
- instruction
- recommendation
- dosage
- times
- days
