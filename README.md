# ONE-App-Scripts
# LAST UPDATED: 8/26/22
### PERTINENT INFORMATION REGARDING THIS REPOSITORY
- This is the current repository for all of the different scripts that I have eitehr written for Ocean Network Express, or am currently working on for Ocean Network Express. Each of the files have a description, as well as a start date and completed date. Because ONE uses Google scripts for some back-end development, and because there is no way to link github to Google scripts, each of these files will be updated manually, periodically. If there is a project that I am working on for ONE that does not use google scripts and can be updated using github, that program will be in a seperate repository.
- Uploaded with the scripts as well are excel files associated with each of the scripts. These files are originally google sheets, however for the sake of example, I have included them as well to see what the files being edited look like. 
- For anyone that has copied any of these scripts for whatever purpose and are trying to edit the excel files that I have included after you have downloaded them, this piece of information is for you. Because all scripts are done through Google scripts, and thus through Google's servers, there is no way that I know of to link these scripts with excel files automatically. To see the scripts in action, you will have to copy over all of the information from the excel sheet and paste it into a google sheet that is linked to the script you want to be executed.
- Each of the excel files that are saved from google sheets are updated either periodically, weekly, or daily, and the information that is currently on those google sheets is subject to change. I will not be uploading or updating any of the excel sheets with data from the new google sheets as the excel files are only used for example purposes and do not need to be updated.
- Below are my listed start and end dates at ONE. In the event that I no longer am employed by ONE, this repository will no longer be updated
  - **Start Date:** 8/8/2022
  - **End Date:** Currently Employed

### What Each of The Scripts Does
Each of the scripts already has a much lengthier description, as well as comments in the script explaining each of the steps of the script, so I will keep descriptions of what each brief. All NA Network Map scripts as well as the ORF Terminal Update script are all executed by triggers that were created inside of the Google script IDE.
1. **GSheet to Email:** Sends an email to the emails saved on a google sheet with their accompanying subject and body text
2. **Import Excel file to Google Drive and convert to Google Sheet:** Creates a drop down menu in the google sheets ui that allows user to convert excel files that are saved on the google drive into google sheets. (No example spreadsheets are provided, as any excel file should work with this script).
3. **ONE NA Network Map:** ***There are four different scripts in this folder, all very similar but some are altered slightly. I will provide the overarching explanation of what each of them do, and then explain how the ones that are different are each different on another line.*** Creates new rows populated with the necessary data so that when the google sheet is uploaded to the ONE NA Network Map, each layer's markers will appear in order of green, yellow, red. 
    - **Imports at Destination and Awaiting Pickup Days:** Both of these scripts pull data automatically from an email that is sent to me, erasing all of the previous data entirely and populating it with the new data.
    - **Chassis Status Report:** Unlike the other scripts, who are each dynamic with the number of rows they can have as they are updated automatically from email, the spreadsheet that this one links to is not dynamic, because it it manually updated by another team, and can only have a certain portion of data erased. An alert message method was created in case someone tried to edit a cell that could cause the automation to fail, warning them of what they are doing, and who to contact to prevent the automation from failing.
    - **Door Truck Capacity Status:** Similar to the 'Chassis Status Report' script, the script this spreadsheet links to is also updated manually by a seperate team. Because the team that updates this spreadsheet do not want empty rows appearing, the sheet used by NA Network Map is shown, had actions performed on it, and then re-hidden. Please refer to the script itself for a more detailed explanation.
4. **ORF Terminal Update (SCRIPT HANDED OVER TO TEAMMATE AND WILL NOT BE UPDATED FURTHER):** A script that pulls data from an HTML page, and then compares it to data from ONE's database on a seperate sheet. That sheet is then saved as a PDF and automatically sent to parties who that data is relevant towards. 

If there is anything that needs further explanation, please don't hesistate to reach out to me and ask. I will do my best to help. 
