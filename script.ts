declare const html2pdf:any 

//initializing the variables
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement ;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeDateOfBirth = document.getElementById("resumeDateOfBirth") as HTMLParagraphElement;
const resumeEducationDegree = document.getElementById("resumeEducationDegree") as HTMLParagraphElement;
const resumeEducationInstitution = document.getElementById("resumeEducationInstitution") as HTMLParagraphElement;
const resumeEducationYear = document.getElementById("resumeEducationYear") as HTMLParagraphElement;

const resumeWorkExperienceJobTitle = document.getElementById("resumeWorkExperienceJobTitle") as HTMLParagraphElement;
const resumeWorkExperienceCompany = document.getElementById("resumeWorkExperienceCompany") as HTMLParagraphElement;
const resumeWorkExperienceDuration = document.getElementById("resumeWorkExperienceDuration") as HTMLParagraphElement;

const resumeSkillsProfessional = document.getElementById("resumeSkillsProfessional") as HTMLParagraphElement;
const resumeSkillsSoft = document.getElementById("resumeSkillsSoft") as HTMLParagraphElement;
const resumeSkillsMore = document.getElementById("resumeSkillsMore") as HTMLParagraphElement;

const editResume = document.getElementById("editResume") as HTMLButtonElement;
const shareLinkButton = document.getElementById("shareLinkButton") as HTMLButtonElement;
const downloadResumePDF = document.getElementById("downloadResumePDF") as HTMLButtonElement;

resumeForm.addEventListener("submit", async (event:Event)=>{
    event.preventDefault()

//collecting the data
const name1 = (document.getElementById("name1") as HTMLInputElement).value;
const email = (document.getElementById("email") as HTMLInputElement).value;
const phone = (document.getElementById("phone") as HTMLInputElement).value;
const dateOfBirth = (document.getElementById("dateofBirth") as HTMLInputElement).value;
const degree = (document.getElementById("degree") as HTMLInputElement).value;
const institution = (document.getElementById("institution") as HTMLInputElement).value;
const year = (document.getElementById("year") as HTMLInputElement).value;
const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;
const company = (document.getElementById("company") as HTMLInputElement).value;
const duration = (document.getElementById("duration") as HTMLInputElement).value;
const professionalSkills = (document.getElementById("professionalSkills") as HTMLInputElement).value;
const softSkills = (document.getElementById("softSkills") as HTMLInputElement).value;
const addMoreSkills = (document.getElementById("addMoreSkills") as HTMLInputElement).value;

//fetching photo
const photoInput = (document.getElementById("photo") as HTMLInputElement);
const photoFile = photoInput.files? photoInput.files[0]:null;

let photoBase64 = '';

//personal information
if(photoFile){
    photoBase64 = await fileToBase64(photoFile);
    localStorage.setItem("resumePhoto", photoBase64);
    resumePhoto.src = photoBase64;
}
document.querySelector(".container")?.classList.add("hidden");
resumePage.classList.remove("hidden");
// Add content and apply bold styling using class
resumeName.textContent = name1;
resumeEmail.innerHTML = `📧 <span class="bold">EMAIL ADDRESS:</span> ${email}`;
resumePhone.innerHTML = `📞 <span class="bold">PHONE NO: </span> ${phone}`;
resumeDateOfBirth.innerHTML = `📅 <span class="bold">DATE OF BIRTH:</span> ${dateOfBirth}`;

// Education section
resumeEducationDegree.innerHTML = `<span class="bold">DEGREE:</span> ${degree}`;
resumeEducationInstitution.innerHTML = `<span class="bold">INSTITUTION:</span> ${institution}`;
resumeEducationYear.innerHTML = `<span class="bold">YEAR:</span> ${year}`;

// Work experience section
resumeWorkExperienceJobTitle.innerHTML = `<span class="bold">JOB TITLE:</span> ${jobTitle}`;
resumeWorkExperienceCompany.innerHTML = `<span class="bold">COMPANY:</span> ${company}`;
resumeWorkExperienceDuration.innerHTML = `<span class="bold">DURATION:</span> ${duration}`;

// Skills section
resumeSkillsProfessional.innerHTML = `<span class="bold">PROFESSIONAL SKILLS:</span> ${professionalSkills}`;
resumeSkillsSoft.innerHTML = `<span class="bold">SOFT SKILLS:</span> ${softSkills}`;
resumeSkillsMore.innerHTML = `<span class="bold">ADD MORE SKILLS:</span> ${addMoreSkills}`;

 
// share link
const queryParams = new URLSearchParams({
    name1:name1,
    email: email,
    phone: phone,
    dateOfBirth : dateOfBirth,
    degree: degree,
    institution: institution,
    year: year,
    jobTitle: jobTitle,
    company: company,
    duration: duration,
    professionalSkills: professionalSkills,
    softSkills: softSkills,
    addMoreSkills: addMoreSkills
})
 
const uniqueURL = `${window.location.origin}? ${queryParams.toString()}`
shareLinkButton.addEventListener("click", ()=>{
    navigator.clipboard.writeText(uniqueURL);
    alert("The link is copied to clipboard");
})

window.history.replaceState(null, '' ,`${queryParams.toString()}`)


})

//fileToBase64 function
function fileToBase64(file:File):Promise<string>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader()
        reader.onload= () =>resolve(
            reader.result as string
        )
        reader.onerror = reject;
        reader.readAsDataURL(file)
    })
}

//edit button
editResume.addEventListener("click", ()=>{
    updateFormFromResume();

    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");

})
function updateFormFromResume() {
    const nameElement = document.getElementById("name1") as HTMLInputElement | null;
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const phoneElement = document.getElementById("phone") as HTMLInputElement | null;
    const dateOfBirthElement = document.getElementById("dateOfBirth") as HTMLInputElement | null;
    const degreeElement = document.getElementById("degree") as HTMLInputElement | null;
    const institutionElement = document.getElementById("institution") as HTMLInputElement | null;
    const yearElement = document.getElementById("year") as HTMLInputElement | null;
    const jobTitleElement = document.getElementById("jobTitle") as HTMLInputElement | null;
    const companyElement = document.getElementById("company") as HTMLInputElement | null;
    const durationElement = document.getElementById("duration") as HTMLInputElement | null;
    const professionalSkillsElement = document.getElementById("professionalSkills") as HTMLInputElement | null;
    const softSkillsElement = document.getElementById("softSkills") as HTMLInputElement | null;
    const addMoreSkillsElement = document.getElementById("addMoreSkills") as HTMLInputElement | null;

    nameElement && (nameElement.value = resumeName?.textContent || '');
   // Ensure you replace the content properly
emailElement && (emailElement.value = resumeEmail?.innerHTML.replace('📧 <span class="bold">EMAIL ADDRESS:</span>', '').trim() || '');
phoneElement && (phoneElement.value = resumePhone?.innerHTML.replace('📞 <span class="bold">PHONE NO: </span>', '').trim() || '');

    dateOfBirthElement && (dateOfBirthElement.value = resumeDateOfBirth?.textContent || '');
    degreeElement && (degreeElement.value = resumeEducationDegree?.textContent?.replace('DEGREE:', '') || '');
    institutionElement && (institutionElement.value = resumeEducationInstitution?.textContent?.replace('INSTITUTION:', '') || '');
    yearElement && (yearElement.value = resumeEducationYear?.textContent?.replace('YEAR:', '') || '');
    jobTitleElement && (jobTitleElement.value = resumeWorkExperienceJobTitle?.textContent?.replace(' JOB TITLE:', '') || '');
    companyElement && (companyElement.value = resumeWorkExperienceCompany?.textContent?.replace('COMPANY:', '') || '');
    durationElement && (durationElement.value = resumeWorkExperienceDuration?.textContent?.replace('DURATION:', '') || '');
    professionalSkillsElement && (professionalSkillsElement.value = resumeSkillsProfessional?.textContent?.replace('PROFESSIONAL SKILLS:', '') || '');
    softSkillsElement && (softSkillsElement.value = resumeSkillsSoft?.textContent?.replace('SOFT SKILLS:', '') || '');
    addMoreSkillsElement && (addMoreSkillsElement.value = resumeSkillsMore?.textContent?.replace('ADD MORE SKILLS: ', '') || '');
}

// download pdf functionality
downloadResumePDF.addEventListener("click", ()=>{
    if (typeof html2pdf === 'undefined' ){
        alert('Error: html2pdf library is not loaded');
        return;
    }

const resumeOptions = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: {
        type: 'jpeg',
        quality: 1.0
    },
    html2canvas: {
        scale: 2
    },
    jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
    }
};

html2pdf()
    .from(resumeContent)
    .set(resumeOptions)
    .save()
    .catch((error:Error)=>{
        console.error("pdf error", error)
    })
})

window.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const name1 = params.get("name1") || '';
    const email = params.get("email") || '';
    const phone = params.get("phone") || '';
    const dateOfBirth = params.get("dateOfBirth") || '';
    const degree = params.get("degree") || '';
    const institution = params.get("institution") || '';
    const year = params.get("year") || '';
    const jobTitle = params.get("jobTitle") || '';
    const company = params.get("company") || '';
    const duration = params.get("duration") || '';
    const professionalSkills = params.get("professionalSkills") || '';
    const softSkills = params.get("softSkills") || '';
    const addMoreSkills = params.get("addMoreSkills") || '';
 
    if(name1 || email || phone || dateOfBirth || degree || institution || year || jobTitle || company || professionalSkills|| softSkills || addMoreSkills){

        resumeName.textContent = name1;
resumeEmail.innerHTML = `📧 <span class="bold">EMAIL ADDRESS:</span> ${email}`;
resumePhone.innerHTML = `📞 <span class="bold">PHONE NO:</span> ${phone}`;
resumeDateOfBirth.innerHTML = `📅 <span class="bold">DATE OF BIRTH:</span> ${dateOfBirth}`;

// Education section
resumeEducationDegree.innerHTML = `<span class="bold">DEGREE:</span> ${degree}`;
resumeEducationInstitution.innerHTML = `<span class="bold">INSTITUTION:</span> ${institution}`;
resumeEducationYear.innerHTML = `<span class="bold">YEAR:</span> ${year}`;

// Work experience section
resumeWorkExperienceJobTitle.innerHTML = `<span class="bold">JOB TITLE:</span> ${jobTitle}`;
resumeWorkExperienceCompany.innerHTML = `<span class="bold">COMPANY:</span> ${company}`;
resumeWorkExperienceDuration.innerHTML = `<span class="bold">DURATION:</span> ${duration}`;

// Skills section
resumeSkillsProfessional.innerHTML = `<span class="bold">PROFESSIONAL SKILLS:</span> ${professionalSkills}`;
resumeSkillsSoft.innerHTML = `<span class="bold">SOFT SKILLS:</span> ${softSkills}`;
resumeSkillsMore.innerHTML = `<span class="bold">ADD MORE SKILLS:</span> ${addMoreSkills}`;

const savePhoto =  localStorage.getItem("resumePhoto")
 if(savePhoto){
    resumePhoto.src = savePhoto;
 }
    }
});

resumePhoto.style.width = "150px"
resumePhoto.style.height= '160px';
resumePhoto.style.objectFit= "cover"
resumePhoto.style.borderRadius = "50%";
resumePhoto.style.display = "block"
resumePhoto.style.margin = "0 auto"
resumePhoto.style.border = "3px solid #356ba3"

