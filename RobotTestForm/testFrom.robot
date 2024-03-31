*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${BROWSER}    Chrome
##########   Valid    ##########
${Name_Title_TH_1}    นาย
${Name_Title_TH_2}    นาง
${Name_Title_TH_3}    นางสาว
${Firstname_TH}    ภูเบศวร์ 
${Lastname_TH}    นิ่มนวล
${Name_Title_EN_1}    Mr.
${Name_Title_EN_2}    Mrs.
${Name_Title_EN_3}    Ms.
${Firstname_EN}    Phubate
${Lastname_EN}    Nimnuan
${Day}  25
${Month}    พฤศจิกายน
${YearB.E.}    2546
${IDcard_13}    1710400070504
${Password8}    Password8
${Phone_number}    01234567890
${Email_Webmail}    654259011@webmail.npru.ac.th

##########   In Valid    ##########
${Firstname_EN_low}    phubate 
${Lastname_EN_low}    nimnuan
${IDcard_X_12}    X171040007050
${IDcard_12}    171040007050
${password8}    isnotpassword8    # Lowercase
${PASSWORD8}    ISNOTPASSWORD8    # Uppercase
${Password_7}    IsNotPa
${Phone_number_<10}    01234513
${Email_Gmail}    654259011@Gmail.com

*** Test Cases ***
Successfully signed
    Open SignupForm
    Wait Until Page 
    Input TH information
    Input EN information
    Input Birthday
    Input ID Card
    Input Password
    Input Phone Number
    Input Email
    Input Checkbox
    Click Button
    Verify Signup Results
    Close Browser
Check Invalid Name TH 
    Open SignupForm
    Wait Until Page 
    TH information But Input EN
    Click Space
    Verify Invalid Name_TH_Only
    Close Browser

Check In Valid Name EN
    Open SignupForm
    Wait Until Page 
    EN information But Input TH
    Click Space
    Verify Invalid Name_EN_Only
    Close Browser

Check In ID Card Valid 
    Open SignupForm
    Wait Until Page 
    Input ID Card A_12 characters
    Click Space
    Verify Invalid IDcard_Only
    Close Browser

*** Keywords ***
Open SignupForm
    Open Browser    http://localhost:5173/    ${BROWSER}

Wait Until Page
    Wait Until Page Contains Element    id=root
###########
Input TH information
    Select From List by Value    id=nameTitleTha    ${Name_Title_TH_1}
    Input Text      id=firstnameTha                 ${Firstname_TH}
    Input Text      id=lastnameTha                 ${Lastname_TH}

Input EN information
    Select From List by Value    id=nameTitleEng    ${Name_Title_EN_1}
    Input Text      id=firstnameEng                 ${Firstname_EN}
    Input Text      id=lastnameEng                 ${Lastname_EN}

Input Birthday
    Select From List by Value    id=birthDate    ${Day}
    Select From List by Label    id=birthMonth    ${Month}
    Select From List by Label    id=birthYear    ${YearB.E.}

Input ID Card
    Input Text      id=idCard                 ${IDcard_13}

Input Password
    Input Text      id=password                 ${Password8}

Input Phone Number
    Input Text      id=mobile                 ${Phone_number}

Input Email
    Input Text      id=email                 ${Email_Webmail}

Input Checkbox
    Execute JavaScript    document.getElementById('accept').click()
    
Click Button    
    Execute JavaScript    document.getElementById('submitbtn').click()  
Verify Signup Results  
    Page Should Contain    Submitting...   
############

Click Space
    Click Element    id=root
TH information But Input EN
    Input Text      id=firstnameThai                ${Firstname_EN}
    Input Text      id=lastnameThai                 ${Lastname_EN}
EN information But Input TH
    Input Text      id=firstnameEng                 ${Firstname_TH}
    Input Text      id=lastnameEng                 ${Lastname_TH}

Input ID Card A_12 characters
    Input Text      id=idCard                 ${IDcard_A_12}
Verify Invalid Name_TH_Only
    Page Should Contain    Must be in Thai only

Verify Invalid Name_EN_Only
    Page Should Contain    Must be in English only

Verify Invalid IDcard_Only
    Page Should Contain    number only   