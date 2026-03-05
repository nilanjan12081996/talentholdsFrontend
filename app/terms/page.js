import React from 'react';
import Link from "next/link";
import Image from 'next/image';

import { Label, TextInput, Textarea, Datepicker, Button  } from "flowbite-react";

import hospital_banner from "../../assets/imagesource/hospital_banner.png";
import social_img from "../../assets/imagesource/social_img.png";
import contact_img from "../../assets/imagesource/contact_img.png";
import captcha_img from "../../assets/imagesource/captcha_img.png";
import hospital_01 from "../../assets/imagesource/hospital_01.png";
import crm_img from "../../assets/imagesource/crm_img.png";

import crm_img_01 from "../../assets/imagesource/crm_img_01.png";
import crm_img_02 from "../../assets/imagesource/crm_img_02.png";
import crm_img_03 from "../../assets/imagesource/crm_img_03.png";
import crm_img_04 from "../../assets/imagesource/crm_img_04.png";
import crm_img_05 from "../../assets/imagesource/crm_img_05.png";
import crm_img_06 from "../../assets/imagesource/crm_img_06.png";
import crm_img_07 from "../../assets/imagesource/crm_img_07.png";
import crm_img_08 from "../../assets/imagesource/crm_img_08.png";

import { BiCheck } from "react-icons/bi";

import { GoArrowUpRight } from "react-icons/go";
import { MdMiscellaneousServices } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { BiSolidUniversalAccess } from "react-icons/bi";
import { PiDevicesFill } from "react-icons/pi";
import { BiSolidCustomize } from "react-icons/bi";
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";

const page = () => {
  return (
    <div>
        {/* Banner section start here */}
        <div className='banner_area py-0 lg:p-0'>
            <div className="inner_banner_area relative lg:mx-[30px] mx-4 my-5 lg:my-0">
                <Image src={hospital_banner} alt='hospital_banner' className="" />
                <div className="banner_content_area absolute w-full h-full left-0 top-0">
                    <div className='max-w-6xl mx-auto flex justify-center items-center h-full'>
                        <div className="w-full px-0 pt-0 lg:pt-0">
                            <h1 className="text-[18px] leading-[24px] lg:text-[50px] lg:leading-[60px] text-white font-bold mb-0 lg:mb-0 pl-4 lg:pl-0">Terms and <span className='text-[#FF0016]'>Conditions</span></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Banner section ends here */}

        {/* wrapper section start here */}
        <div className='wrapper_section mb-10 px-4 lg:px-0'>
            <div className="max-w-6xl mx-auto lg:py-[80px]">
                <div className='w-full'>
                    <div>
                        <h2 className="text-[19px] leading-[25px] lg:text-[38px] lg:leading-[45px] pb-2 lg:pb-8 text-black font-bold text-center">
                            <span className="text-[#ff0016]">xcelcuré™</span> Hospital Management system integrated with Mobile App - Terms and Conditions
                        </h2>
                        <p className="text-[#69697B] font-medium text-sm lg:text-xl lg:pb-3 pb-3 ${helveticaNeue.className}">
                            Updated effective from 25th August, 2022
                        </p>
                        <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-3 pb-3 ${helveticaNeue.className} text-center italic">
                            This Site/Application/Services is/are operated/provided by Xcelcure Technologies LLP
                        </p>
                        <div className='mb-4'>
                            <div className='bg-white border border-[#dfdfdf] rounded-[10px] p-3'>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                    These terms and conditions (“User Terms”) read with the Privacy Policy available on the Site/Application constitutes a legal binding 
                                    agreement (“Agreement”) between You and Xcelcure Technologies LLP and shall apply to and govern Your visit to and use, of the 
                                    Site/Application (whether in the capacity of an user or a Practitioner) and any of its products or services whether through a 
                                    computer or a mobile phone as well as to all information, recommendations and or Services provided to You on or through the 
                                    Site/Application. This Agreement defines the terms and conditions under which you are allowed to use the Site/Application and 
                                    describes the way we shall treat your account while you are registered as a member with us. This User Terms apply to the 
                                    Services made available by Xcelcure Technologies LLP on the Site/Application including various products offered by Xcelcure 
                                    Technologies LLP, the Services rendered by Practitioners listed on the Site/Application, to various users including medical 
                                    practitioners and other users/visitors of the Site/Application. We reserve the right to store information on a user’s computer 
                                    in the form of “cookie” or similar file for purposes of modifying the Site/Application to reflect the User’s preference. 
                                    Xcelcure Technologies LLP shall try and ensure that all information that is provided on the Site/Application with respect 
                                    to policies / products/Services are accurate in all respects and are kept up to date. However, Xcelcure Technologies LLP 
                                    does not guarantee the timeliness, accuracy, completeness, reliability or content of the information and any changes 
                                    that are made with respect to the same and the visitor/Customer is required to check the accuracy of the same with the 
                                    office of Xcelcure Technologies LLP.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    Xcelcure Technologies LLP’ performance to this Agreement is subject to existing laws and legal process, and nothing contained in this 
                                    Agreement is in derogation of Xcelcure Technologies LLP’ right to comply with governmental, court and law enforcement directions 
                                    relating to the use of this Site/Application or information provided to/gathered by Xcelcure Technologies LLP vis-à-vis such use.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    Xcelcure Technologies LLP may introduce new services in relation to the Site/Application from time to time. The existence and 
                                    availability of the new services will be notified on the Site/Application as and when they become available and any revisions 
                                    in the Terms & Conditions will take place in accordance with these Terms & Conditions. In addition, Xcelcure Technologies 
                                    LLP may also publish notices of general nature, which are applicable to all visitors or Customers in a newspaper or on its 
                                    Site/Application. Such notices will have the same effect as a notice served individually to each visitor or Customer.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    This document is an electronic record in terms of Information Technology Act, 2000 and rules thereunder as applicable and the 
                                    provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. 
                                    This electronic record is generated by a computer system and does not require any physical or digital signatures. 
                                    By accessing this Site/Application, You are consenting to be bound by these User Terms and the Privacy Policy. 
                                    PLEASE ENSURE THAT YOU READ AND UNDERSTAND ALL THESE USER TERMS BEFORE YOU USE THE SITE/APPLICATION. If You do 
                                    not accept any of the User Terms, then please do not use the Site/Application or avail any of the services/Services being provided therein.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                    Your acceptance of the User Terms shall be deemed to include your acceptance of the Privacy Policy available at the Site/Application.
                                </p>
                            </div>
                        </div>
                        <div className='mb-4'>
                           <p className="text-[#ff0016] font-medium text-sm lg:text-base lg:pb-3 pb-3 ${helveticaNeue.className}">
                               <strong>• DEFINTIONS</strong>
                            </p>
                            <div className='bg-white border border-[#dfdfdf] rounded-[10px] p-3'>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                   All of the defined and capitalized terms in these User Terms will have the meaning assigned to them here below:
                                </p>
                                 <ul className='mb-4 pl-5'>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (i) “Account” shall mean the account created by the Customer on the Application for availing the Services provided/facilitated by Xcelcure Technologies LLP.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (iii) “Applicable Laws” shall mean and include all applicable statutes, enactments, acts of legislature or parliament, laws, ordinances, rules, by-laws, regulations, notifications, guidelines, policies, directions, directives and orders of any governmental authority, tribunal, or a court of India.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (iv) “Application” shall mean our mobile application and/or website as updated by Xcelcure Technologies LLP from time to time.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (v) “Customer/ You/User” shall mean and include:
                                        <ul className='pl-5 pt-2'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-decimal">A medical practitioner or healthcare/wellness provider (whether an individual professional or an organization) 
                                                or similar institution wishing to be listed, or already listed, and providing healthcare services, on the Site/Application, 
                                                including designated, authorised associates of such practitioners or institutions (“Practitioner(s)”, “you” or “User”); or</li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-decimal">
                                                A patient, availing this service on his/her consent, being or not being sponsored/promoted by any organisation/body to 
                                                utilise the services through the Site/Application, his/her representatives or affiliates, searching for availing health 
                                                and medical services through the Site/Application; or.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-decimal">
                                                Otherwise a user of the Site/Application who has an Account on the Site/Application (“End User”).
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-decimal">
                                                A visitor of the Site/Application.
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (vi) “Force Majeure Event” shall mean any and all events arising due to any cause beyond the reasonable control of Xcelcure Technologies LLP.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (vii) “Xcelcure Technologies LLP” or “us” or “we” or “our” shall mean Xcelcure Technologies LLP, a company incorporated under 
                                        the provisions of the Companies Act, 2013 and having its registered office at Lokenath Apartment, 3rd Floor, 3D, Goursundar Sett Lane. 
                                        Kolkata 700050 which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to mean and include 
                                        all its successors, affiliates and permitted assigns.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (viii) “Registration Data” shall mean and may include the present, valid, true and accurate name, email ID, phone number 
                                        and such other information as may be required by Xcelcure Technologies LLP from the Customer from time to time for registration 
                                        on the Application.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (ix) “Services” shall mean the various categories of Services including the following made available through the Site/Application:
                                        <ul className='pl-5 pt-2'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-decimal">
                                                <strong>For Practitioners</strong> : Outreach of Practitioners and their profiles along with options made available to 
                                                the other Users and visitors of the Site/Application for teleconsultations.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-decimal">
                                               <strong>For other Users</strong> : Facility to
                                               <ul className='pl-4 pt-2'>
                                                  <li className='list-disc'>create and maintain ‘Health Accounts’ and upload claim requests track the progress of the same.</li>
                                                  <li className='list-disc'>search for Practitioners by specialty, services offered or any other criteria that may be developed 
                                                    and made available by Xcelcure Technologies LLP.</li>
                                                  <li className='list-disc'>make appointments with Practitioners.</li>
                                                  <li className='list-disc'>interact with healthcare chatbot; and</li>
                                                  <li className='list-disc'>To avail other services offered by Xcelcure Technologies LLP and its partners, like but not limited to, 
                                                    medicine delivery, diagnostics, home-healthcare, track fitness activities and health vitals, etc.</li>
                                                  <li className='list-disc'>Insurance related services/consulting services.</li>
                                               </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (xviii)“Site” shall mean the Application and the website operated by Xcelcure Technologies LLP or any other software 
                                        that enables the use of the Site/Application or such other URL as may be specifically provided by Xcelcure Technologies LLP.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (xviii) “T&Cs” and “User Terms” shall mean these Customer terms and conditions.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='mb-4'>
                           <p className="text-[#ff0016] font-medium text-sm lg:text-base lg:pb-3 pb-3 ${helveticaNeue.className}">
                               <strong>• ELIGIBILITY</strong>
                            </p>
                            <div className='bg-white border border-[#dfdfdf] rounded-[10px] p-3'>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                   You will be “Eligible” to use the Services only when You fulfil all of the following conditions:
                                </p>
                                 <ul className='mb-4 pl-5 border-b border-[#dfdfdf] lg:pb-5 pb-5'>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (i) You have attained at least 18 (eighteen) years of age.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        (ii) You are competent to enter into a contract under the Applicable Laws.
                                    </li>
                                </ul>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                  If You reside in a jurisdiction that restricts the use of the Service because of age or restricts the ability to enter 
                                  into contracts such as this User Terms due to age, You must abide by such age limits.
                                </p>
                            </div>
                        </div>
                         <div className='mb-4'>
                           <p className="text-[#ff0016] font-medium text-sm lg:text-base lg:pb-3 pb-3 ${helveticaNeue.className}">
                               <strong>• REGISTRATION/MEMBERSHIP AND MANNER OF USAGE OF ACCOUNT</strong>
                            </p>
                            <div className='bg-white border border-[#dfdfdf] rounded-[10px] p-3'>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                    You understand and acknowledge that You can register on the Site only after complying with the requirements 
                                    of this Clause 3 and by entering Your Registration Data.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    You shall ensure that the Registration Data provided by You is accurate, complete, current, valid and true and is updated from 
                                    time to time. We shall bear no liability for false, incomplete, old or incorrect Registration Data provided by You.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    You are solely responsible for maintaining the confidentiality of Your Registration Data and will be liable for all activities 
                                    and transactions that occur through Your Account, whether initiated by You or any third party. Your Account cannot be transferred, 
                                    assigned, or sold to a third party. We shall not be liable for any loss that You may incur as a result of someone else using Your 
                                    password or Account, either with or without Your knowledge.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    We reserve the right to suspend or terminate Your Account with immediate effect and for an indefinite period, if We have a reason 
                                    to believe that the Registration Data or any other data provided by You is incorrect or false, or that the security of Your Account 
                                    has been compromised in any way, or for any other reason We may find just or equitable.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    Except for the Registration Data or any other data submitted by You during the use of any other service offered through Site 
                                    (“Permitted Information”), Xcelcure Technologies LLP does not want You to, and You should not, send any confidential or 
                                    proprietary information to Xcelcure Technologies LLP on the Site or otherwise, unless otherwise is required by Applicable 
                                    Laws. In accepting these User Terms You agree that any information or materials that You or individuals acting on Your 
                                    behalf provide to Xcelcure Technologies LLP other than the Permitted Information will not be considered confidential or proprietary.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                   It is Your responsibility to check to ensure that You download the correct application for Your device. We are not liable if 
                                   You do not have a compatible mobile device or if You download the wrong version of the Application for Your mobile device. 
                                   We reserve the right to terminate the Service and the use of the Application should You be using the Service or Application 
                                   with an incompatible or unauthorized device.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                   We allow You to open only one Account in association with the Registration Data provided by You. In case of any unauthorized 
                                   use of Your Account please immediately reach Us a icare@xcelcure.com. In case, You are unable to access Your Account, please 
                                   inform Us at icare@xcelcure.com and make a written request for blocking Your Account. We will not be liable for any unauthorised 
                                   ransactions made through Your Account prior to the expiry of 72 (seventy-two) hours after You have made a request in writing 
                                   for blocking Your Account and shall not have any liability in case of Force Majeure Events.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                   By using the Application or the Service, You further agree that: (i) You will only use the Service or download the Application 
                                   for Your sole, personal use and will not resell or assign it to a third party; (ii) You will not use an account that is subject 
                                   o any rights of a person other than You without appropriate authorization; (iii) You will not use the Service or Site for 
                                   unlawful purposes; (iv) You will not try to harm the Service, Site or our network in any way whatsoever; (v) You will provide 
                                   Xcelcure Technologies LLP with such information and documents which Xcelcure Technologies LLP may reasonably request; (vi) 
                                   You will comply with all Applicable Law from Your country of domicile and residence and the country, state and/or city in 
                                   which You are present while using the Site or Service; and (vii) You are aware of and shall comply with the Information 
                                   Technology Act, 2000 and the rules, regulations and guidelines notified thereunder.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">Xcelcure Technologies LLP reserves the right to immediately terminate the Service and the use of the Application in the event 
                                    of non-compliance with any of the above requirements. Further, Xcelcure Technologies LLP will store the information provided 
                                    by You or record your calls for contacting You for all Service-related matters including obtaining feedback in relation to 
                                    the Services provided/facilitated through the Site/Application. You shall promptly inform Xcelcure Technologies LLP on any 
                                    change in the information provided by You.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">Xcelcure Technologies LLP or an authorised representative of Xcelcure Technologies LLP, shall provide information regarding 
                                    services, discounts and promotions provided by Xcelcure Technologies LLP to You by way of an SMS or email to Your registered 
                                    mobile number/registered email ID. You also have the option to discontinue receiving such information at any point of time. 
                                    To discontinue receiving such information, You may at any point of time visit the specific link provided in the Site/Application 
                                    to discontinue the same.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">XCELCURE TECHNOLOGIES LLP WILL BE ENTITLED TO PROCESS AND TRANSFER YOUR INFORMATION AS AND WHEN IT DEEMS FIT AND IT MAY STORE 
                                    OR TRANSFER YOUR INFORMATION IN A SERVER OUTSIDE INDIA OR THE COUNTRY WHERE YOU ARE LOCATED IN ORDER TO PERFORM XCELCURE 
                                    TECHNOLOGIES LLP’S OBLIGATIONS UNDER THESE CUSTOMER T&C.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                    You agree to grant Xcelcure Technologies LLP a non-exclusive, worldwide, perpetual, 
                                    irrevocable, royalty- free, sub-licensable (through multiple tiers) right to exercise the copyright, 
                                    publicity, database rights or any other rights You have in your information, in any media now known or not 
                                    currently known, with respect to Your information. YOU AGREE AND PERMIT XCELCURE TECHNOLOGIES LLP TO SHARE YOUR INFORMATION 
                                    AND/OR PERMITTED INFORMATION, WITH THIRD PARTIES.
                                </p>
                                 <ul className='mb-4 pl-5 border-b border-[#dfdfdf] lg:pb-5 pb-5'>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        I. Obtaining feedback in relation to Site/Application or Xcelcure Technologies LLP’ services, including chatbot; and/or.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        II. Obtaining feedback in relation to any Practitioners listed on the Site/Application; and/or.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        III. Connecting for any further details like diagnostics, medicine delivery requests, product redemptions, consultation management, etc.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        IV. Resolving any complaints, information, or queries by Practitioners regarding your critical content.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        V. and you agree to provide your fullest cooperation further to such communication by Xcelcure Technologies LLP.
                                    </li>
                                </ul>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    You agree and permit Xcelcure Technologies LLP to share any information provided by You with third parties to facilitate provision 
                                    of Services including certain value-added/ancillary services offered by such third parties to You and/or to provide Services including 
                                    certain value-added services to You by Xcelcure Technologies LLP. You hereby expressly consent to receive communications 
                                    from Xcelcure Technologies LLP / third parties offering Services/value-added services to You through Your registered phone 
                                    number and/or e-mail id and/or the Site. You agree that You will not hold Xcelcure Technologies LLP responsible for any such 
                                    communications received from third parties, nor will any such communication amount to spam, unsolicited communication or a violation 
                                    of Your registration on the national do not call registry. Further, you agree that Xcelcure Technologies LLP may contact you through 
                                    telephone, email, SMS, or any other electronic means of communication for the purpose of:
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    Against every Practitioner listed in the Site/Application, you get an option to ‘Book an Appointment’. When you choose this option, 
                                    you choose to schedule a video/audio/chat session with the doctor through technological services provided by Xcelcure Technologies LLP, 
                                    and the records of such calls may be recorded and stored in Xcelcure Technologies LLP’ servers. Such records are dealt with only in 
                                    accordance with the terms of the Privacy Policy. Xcelcure Technologies LLP shall not be responsible for negligence or breach of 
                                    confidentiality obligations qua such information by the Practitioner or other service providers engaged in providing Services.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    Against every Practitioner listed in the Site/Application, you get an option to ‘Book an Appointment’. When you choose this option, 
                                    you choose to schedule a video/audio/chat session with the doctor through technological services provided by Xcelcure Technologies LLP, 
                                    and the records of such calls may be recorded and stored in Xcelcure Technologies LLP’ servers. Such records are dealt with only in 
                                    accordance with the terms of the Privacy Policy. Xcelcure Technologies LLP shall not be responsible for negligence or breach of 
                                    confidentiality obligations qua such information by the Practitioner or other service providers engaged in providing Services.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    All claim pay-outs/reimbursement, cashless etc. will be as per our policy as applicable to Customers.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    The Site/Application is deemed to be in use when it is loaded in a temporary or permanent memory of Your computer/Mobile 
                                    or any other electronic gadget.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base ${helveticaNeue.className}">
                                    All transactions, which cannot be carried out instantaneously, shall be carried out during working hours either on the same day or 
                                    on the next working day or such further period as may be determined and/or specified by Xcelcure Technologies LLP depending upon 
                                    the time of logging of the transaction. All transactions that are carried out by and on behalf of the Customer shall be subject 
                                    to Government notifications, the rules, regulations and guidelines issued by the Insurance Regulatory and Development Authority, 
                                    the Reserve Bank of India, and those of other regulatory bodies defining rules/regulations governing the offer of any service 
                                    on the Site/Application.
                                </p>
                            </div>
                        </div>
                        <div className='mb-4'>
                           <p className="text-[#ff0016] font-medium text-sm lg:text-base lg:pb-3 pb-3 ${helveticaNeue.className}">
                               <strong>• PRACTITIONER UNDERTAKING</strong>
                            </p>
                            <div className='bg-white border border-[#dfdfdf] rounded-[10px] p-3'>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className}">
                                   The Practitioner is and shall be duly registered, licensed and qualified to practice medicine/ provide health care, wellness 
                                   services, as per applicable laws/regulations/guidelines set out by competent authorities and the Practitioner shall not be 
                                   part of any arrangement which will prohibit him/her from practicing medicine within the territory of India. The Practitioner 
                                   shall at all times ensure that all the applicable laws that govern the Practitioner shall be followed and utmost care shall be 
                                   taken in terms of the consultation/ services being rendered via the Site/Application. Xcelcure Technologies LLP shall not be 
                                   responsible for ensuring authenticity of the documents submitted by the Practitioners for listing on the Site/Application and 
                                   shall not be liable in any manner whatsoever in case forged or incorrect documents are submitted by such Practitioners.
                                </p>
                            </div>
                        </div>
                        <div className='mb-4'>
                           <p className="text-[#ff0016] font-medium text-sm lg:text-base lg:pb-3 pb-3 ${helveticaNeue.className}">
                               <strong>• APPOINTMENT BOOKING AND INTERACTION WITH PRACTITIONERS</strong>
                            </p>
                            <div className='bg-white border border-[#dfdfdf] rounded-[10px] p-3'>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                   While Xcelcure Technologies LLP will try to ensure a confirmed on-time appointment for an End-User who requested an appointment 
                                   on Site/Application, Xcelcure Technologies LLP does not guarantee that a patient will get a confirmed appointment. Further, Xcelcure 
                                   Technologies LLP has no liability if such appointment is confirmed but later cancelled by Practitioners, or the Practitioners 
                                   are not available as per the given appointment time over text, video, audio or in-person.
                                </p>
                                <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-5 pb-5 ${helveticaNeue.className} border-b border-[#dfdfdf] mb-4">
                                    You understand and agree that any interactions and associated issues with other Users including but not limited to your health 
                                    issues and your experiences is strictly between you and the other Users. You shall not hold Xcelcure Technologies LLP responsible 
                                    for any such interactions and associated issues. For avoidance of doubt, Xcelcure Technologies LLP is not involved in providing 
                                    any healthcare or medical advice or diagnostic services and is merely a facilitator of the same through the Site/Application 
                                    and hence is not responsible for any outcome between you and the Practitioner you interact with, pursuant to any interactions 
                                    on the Site/Application. Your decision to engage with a Practitioner or chatbot for receiving medical services from him/her 
                                    is at your own risk. The results of any search you perform on the Site for Practitioners should not be construed as an 
                                    endorsement by Site/Application of any such particular Practitioner. Xcelcure Technologies LLP, shall not be responsible 
                                    for any breach of service or service deficiency by any Practitioner/chatbot. We cannot assure nor guarantee the ability 
                                    or intent of the Practitioner(s) and chatbot (in any manner possible) to fulfil their obligations towards you, although 
                                    we will take complete measures to ensure your satisfaction with the Practitioner/chatbot. Xcelcure Technologies LLP also 
                                    advises you to perform your own investigation prior to selecting a Practitioner or start the use of chatbot.</p>

                                 <p className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-2 ${helveticaNeue.className}">
                                    Without prejudice to the generality of the above, Xcelcure Technologies LLP, will not be liable for:
                                 </p>
                                 <ul className='mb-4 pl-5 border-b border-[#dfdfdf] lg:pb-5 pb-5'>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        i) any wrong medication or treatment quality being given by the Practitioner(s), or any medical negligence on part of the Practitioner(s);
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        ii) any type of inconvenience suffered by the User due to a failure on the part of the Practitioner to provide agreed services or 
                                        to make himself/herself available at the appointed time, inappropriate treatment, or similar difficulties;
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        iii) cancellation or rescheduling of booked appointment;
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        iv) any medical eventualities that might occur subsequent to using the services of a Practitioner, whom the User has selected 
                                        on the basis of the information available on the Site Application or with whom the User has booked an appointment through the Site/Application.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                        v) Any error in the medical reports provided by the associated bodies/partners/service providers;
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                       Further, Xcelcure Technologies LLP shall not be liable, under any event, for any comments or feedback given by any of the 
                                       Users in relation to the services provided by another User. The option of Users to give feedback remains at Xcelcure 
                                       Technologies LLP’s sole discretion and may be modified or withdrawn at its sole discretion. Xcelcure Technologies LLP 
                                       may moderate such feedback at any time. Xcelcure Technologies LLP shall not be obliged to act in any manner to give 
                                       effect to the content of Users’ feedback, such as suggestions for delisting of a particular Practitioner from the Application/Site.
                                    </li>
                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                       Xcelcure Technologies LLP collects, directly or indirectly, and displays on the Site/Application, relevant information 
                                       regarding the profile and practice of the Practitioners/service providers listed on the Site/Application, such as their 
                                       specialisation, qualification, fees, location, visiting hours, and similar details. Xcelcure Technologies LLP takes reasonable 
                                       efforts to ensure that such information is updated at frequent intervals. Although Xcelcure Technologies LLP screens and 
                                       vets the information and photos submitted by the Practitioners, Xcelcure Technologies LLP cannot be held liable for any 
                                       inaccuracies or incompleteness represented from it, despite such reasonable efforts.
                                    </li>
                                </ul>
                                <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                    <li>• (A) CONSULTING SERVICES
                                        <ul className='mb-4 pl-5 lg:pb-5 pb-5'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Any decisions to purchase any policy/product of Xcelcure Technologies LLP will be based solely on Your independent 
                                                evaluation of the policies/products of Xcelcure Technologies LLP, and Your need for the same. You have the responsibility 
                                                to determine whether the policies/products offered by Xcelcure Technologies LLP satisfy Your requirements. It is Your 
                                                responsibility to evaluate the completeness, accuracy or usefulness of any opinion, guidance or other content made 
                                                available on the Site/Application and You should consult Your own legal counsel, business advisor and tax advisor 
                                                as to the legal, business, tax and related matters concerning any policies with respect to which guidance is sought 
                                                or given. We have provided the relevant information in relation to the policies/products on the Site/Application.
                                                In the event You require any further information or assistance, he/she may contact us at icare@xcelcure.com
                                                <br></br>• NO DOCTOR PATIENT RELATIONSHIP FOR EMERGENCY USE
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Please note that some of the content, text, data, graphics, images, information, suggestions, guidance, and other material 
                                                (collectively, “Information”) that may be available on the Site/Application (including information provided in direct 
                                                response to your questions or postings) may be provided by individuals in the medical profession. The provision of such 
                                                Information does not create a licensed medical professional/patient relationship, between Xcelcure Technologies LLP 
                                                and you and does not constitute an opinion, medical advice, or diagnosis or treatment of any particular condition, 
                                                but is only provided to assist you with locating appropriate medical care from a qualified practitioner.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                It is hereby expressly clarified that, the Information that you obtain or receive from Xcelcure Technologies LLP, 
                                                and its employees, contractors, partners, sponsors, advertisers, licensors or otherwise on the Site/Application, 
                                                including chatbot, is for informational purposes only. We make no guarantees, representations or warranties, whether 
                                                expressed or implied, with respect to professional qualifications, quality of work, expertise or other information 
                                                provided on the Site/Application. In no event shall Xcelcure Technologies LLP be liable to you or anyone else for any 
                                                decision made or action taken by you in reliance on such information.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                The Services are not intended to be a substitute for getting in touch with emergency healthcare, like suicidal 
                                                tendencies and severe mental ailments. If you are an End-User facing a medical emergency (either on your or 
                                                another person’s behalf), please contact an ambulance service or hospital directly.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• APPLICATION LICENSE
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Subject to Your compliance with these User Terms, Xcelcure Technologies LLP grants You a limited, revocable, non-exclusive, 
                                                non-transferable, and non-sub-licensable license to download and install a copy of the Application on a single mobile device 
                                                that You own or control and to run such copy of the Application solely for Your own personal use and to use the Site.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                You shall not: (i) send spam or otherwise duplicative or unsolicited messages in violation of Applicable Laws; (ii) 
                                                send or store infringing, obscene, threatening, libelous, or otherwise unlawful or tortious material, including material 
                                                harmful to children or violative of third party privacy rights; (iii) send or store material containing software viruses, 
                                                worms, Trojan horses or other harmful computer code, files, scripts, agents or programs; (iv) interfere with or disrupt 
                                                the integrity or performance of the Site, the Application or Service or the data contained therein; or (v) attempt to 
                                                gain unauthorized access to the Site, the Application or Service or its related systems or networks.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Xcelcure Technologies LLP will have the right to investigate and prosecute violations of any of the above to the fullest 
                                                extent of the law. Xcelcure Technologies LLP may involve and cooperate with law enforcement authorities in prosecuting 
                                                Users who violate these User Terms. You acknowledge that Xcelcure Technologies LLP has no obligation to monitor Your 
                                                access to or use of the Site, or posted content, but has the right to do so for the purpose of operating the Site 
                                                and Service, to ensure Your compliance with these User Terms, or to comply with Applicable Law or the order or 
                                                requirement of a court, administrative agency or other Governmental body. Xcelcure Technologies LLP reserves 
                                                the right, at any time and without prior notice, to remove or disable access to any content that Xcelcure Technologies 
                                                LLP, at its sole discretion, considers to be in violation of these User Terms or otherwise harmful to the Site, 
                                                the Service or Application.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• FORCE MAJEURE
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                We shall not be liable for any failure to perform any obligations under this User Terms, if the performance is prevented, 
                                                hindered or delayed by a Force Majeure Event and in such case our obligations under this User Terms shall be suspended 
                                                for so long as the Force Majeure Event continues.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• INDEMNIFICATION
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                By accepting these User Terms and using the Service, You agree that You shall defend, indemnify and hold Xcelcure 
                                                Technologies LLP, its affiliates, their licensors, and each of its officers, directors, other users, employees, 
                                                attorneys, Practitioners, third party service providers and agents harmless from and against any and all claims, 
                                                costs, damages, losses, liabilities and expenses (including attorneys’ fees and costs) arising out of or in 
                                                connection with: (a) Your violation or breach of any term of these User Terms or any Applicable Law or regulation, 
                                                whether or not referenced herein; (b) Your violation of any rights of any third party \or (c) Your use or misuse 
                                                of the Application or Service.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• LIMITATION OF LIABILITY
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                The information, recommendations and/or Services provided to You on or through the Site/ Application are for general 
                                                information purposes only and does not constitute advice. Xcelcure Technologies LLP will reasonably keep the 
                                                Site/Application and its contents correct and up to date but does not guarantee that (the contents of) 
                                                the Site is free of errors, defects, malware and viruses or that the Site is correct, up to date and accurate.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Xcelcure Technologies LLP shall not be liable for any damages resulting from the use of or inability to use the Site/Application, 
                                                including damages caused by wrong usage of the Site, error in call centre number, network issues, malware, viruses or any 
                                                incorrectness or incompleteness of the Information or the or Application.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                In no event shall Xcelcure Technologies LLP shall be liable for:
                                                <ul className='mb-4 pl-5'>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">provision of or failure to provide all or any service by Practitioners or listed third parties to users contacted 
                                                        or managed through the Site/Application;
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                        any content posted, transmitted, exchanged or received by or on behalf of 
                                                        any user or other person on or through the Site/Application;
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                        any unauthorized access to or alteration of your transmissions or data; or
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                        any other matter relating to the Site/Application or the Service.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                If Applicable Law does not permit the exclusion of certain warranties or the limitation or exclusion of liability, 
                                                the scope and duration of such warranty exclusions and the extent of the liability of Xcelcure Technologies LLP 
                                                shall be the minimum permitted under Applicable Law.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Under no circumstances, including but not limited to negligence, shall Xcelcure Technologies LLP, its employees and 
                                                directors, its suppliers and its third party advisors be liable to You for any direct, indirect, incidental, special 
                                                or consequential damages or any damages whatsoever including punitive or exemplary (including, but not limited to, 
                                                damages caused by any virus, personal injury, loss of profits, data or other intangible, business interruption, 
                                                loss of privacy, or any other pecuniary loss), arising out of or in any way connected with the use/delivery/performance 
                                                f this Site/Application, with the delay or inability to use this Site/Application or any links or items on the 
                                                Site/Application, the provision of or failure to provide Services, or for any information, software, products, 
                                                services and related graphics obtained through this Site/Application, or otherwise arising out of the use of this 
                                                Site/Application, whether based on contract, tort, strict liability or otherwise, or for cost of procurement of 
                                                substitute goods and repair & correction services or resulting from the use of this Site/Application or obtained 
                                                or messages received or transactions entered into through or from the Site/Application or resulting from unauthorized 
                                                access to or alteration of your transmissions or data, even if we have been advised of the possibility of such damages.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                You agree that we shall not be liable for any damages arising from interruption, suspension or termination of the 
                                                Site/Application, including but not limited to direct, indirect, incidental, special, consequential or exemplary 
                                                damages, whether such interruption, suspension or termination was justified or not, negligent or intentional, 
                                                inadvertent or advertent. Applicable law may not allow the limitation or exclusion of liability or incidental 
                                                or consequential damages. However, in no event shall our liability to you for all damages, losses and causes of 
                                                action (whether in contract or tort, including but not limited to, negligence) exceed the amount paid by You, 
                                                if any, for accessing the Site/Application. Policy/ies are marketed and/or distributed solely by Xcelcure 
                                                Technologies LLP and are not in any way associated to or being sold, marketed or offered for sale by the Payment 
                                                Gateway Service provider and the Payment Gateway Service provider shall not be liable for the same.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                All transactions that are carried out by and on behalf of the Customer shall be subject to Government notifications, the rules, 
                                                regulations and guidelines issued by the Insurance Regulatory and Development Authority, the Securities and Exchange Board of 
                                                India, the Reserve Bank of India, and those of other regulatory bodies defining rules/regulations governing the offer of 
                                                any service on the Site/Application. Xcelcure Technologies LLP does not guarantee or warranty that there will be uninterrupted 
                                                access to and/or use of the Payment and Delivery Mechanism. Xcelcure Technologies LLP shall not be liable if any transaction 
                                                does not fructify or may not be completed or for any failure on part of Xcelcure Technologies LLP to perform any of its 
                                                obligations under these Terms & Conditions or those applicable specifically to its services/facilities if performance is 
                                                prevented, hindered or delayed by a Force Majeure event (defined below) and in such case its obligations shall be suspended 
                                                for so long as the Force Majeure event continues.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• THIRD PARTY WEBSITES
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                The Site/Application may be linked to the website of third parties, affiliates and business partners. However, 
                                                we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation 
                                                with any linked website, unless specifically stated herein. We are not responsible for examining or evaluating, 
                                                and we do not warrant the offerings of, any businesses or individuals or the content of their websites. We do not 
                                                assume any responsibility or liability for the actions, products, services, and content of any other third parties. 
                                                You should carefully review the legal statements and other conditions of use of any website which you access through 
                                                a link from this Site/Application. Your linking to any other off-site websites is at your own risk.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                Xcelcure Technologies LLP has no control over, and not liable or responsible for content, accuracy, validity, reliability, 
                                                quality of such websites or made available by/through our Site/Application. Xcelcure Technologies LLP assume no responsibility, 
                                                and shall not be liable for, any damages to, or viruses that may infect Your equipment or access to Your account, use of, 
                                                or browsing the Site/Application or the downloading of any material, data, text, images, video content, or audio content 
                                                from the Site/Application. If You are dissatisfied with the Site/Application, Your sole remedy is to discontinue using 
                                                the Site/Application.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                Xcelcure Technologies LLP shall not be liable, at any time, for any failure of performance, error, omission, interruption, 
                                                deletion, defect, delay in operation or transmission, computer virus, communications line failure, theft or destruction or 
                                                unauthorized access to, alteration of, or use of information contained at the Site/Application.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                Xcelcure Technologies LLP reserves the rights to display sponsored ads on the Site/Application. Without prejudice to the 
                                                status of other content, Xcelcure Technologies LLP shall not be liable for the accuracy of information or the claims made 
                                                in the Sponsored Listings. Xcelcure Technologies LLP does not encourage the Users to visit the Sponsored Listings page or 
                                                to avail any services from them. Xcelcure Technologies LLP will not be liable for the services of the providers of the 
                                                Sponsored Listings. You represent and warrant that you will use these Services in accordance with applicable law. Any 
                                                contravention of applicable law as a result of your use of these Services is your sole responsibility, and Xcelcure 
                                                Technologies LLP accept no liability for the same.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• INTELLECTUAL PROPERTY OWNERSHIP
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Xcelcure Technologies LLP alone (and its licensors, where applicable) shall own all right, title and interest, including 
                                                all related intellectual property rights, in and to (i) the Site, Application, product, Service and any suggestions, 
                                                ideas, enhancement requests, feedback, recommendations or any other offering; (ii) text, graphics, user interfaces, 
                                                visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code; or (iii) other information 
                                                provided by You or any other party relating to the Site, Application or the Service. Third party trademarks may appear 
                                                on this Site/ Application and all rights therein are reserved to the registered owners of those trademarks. For use 
                                                of any third party’s intellectual property, You need to get permission directly from the owner of the intellectual 
                                                property for any use.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                These User Terms do not constitute a sale and do not convey to You any rights of ownership in or related to the Site, 
                                                the Application or the Service, or any intellectual property rights owned by Xcelcure Technologies LLP. You shall 
                                                be solely responsible for any violations of any laws and for any infringements of any intellectual property rights 
                                                caused by use of the Services or the Site/ Application.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• TERM AND TERMINATION OF USER TERMS
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Unless terminated, the Agreement between Xcelcure Technologies LLP and You is perpetual in nature upon downloading 
                                                the Application and availing the Services through the Site/Application.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                You are entitled to terminate the Agreement at all times by deletion of Your Account, thus, disabling 
                                                the use by You of the Site/Application. You can close Your Account at any time by following the instructions on the Site/Application.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Xcelcure Technologies LLP reserves the right to suspend or terminate a User’s access to the Site/Application and the 
                                                Services with or without notice and to exercise any other remedy available under law, in cases where,
                                                <ul className='mb-4 pl-5'>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                                        i) Such User breaches any terms and conditions of the Agreement;.
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                                        ii) A third party reports violation of any of its right as a result of your use of the Services.
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                                        iii) Xcelcure Technologies LLP is unable to verify or authenticate any information provided to Xcelcure Technologies LLP by a User;
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                                        iv) Xcelcure Technologies LLP has reasonable grounds for suspecting any illegal, fraudulent or abusive activity on part of such User; or;
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-1 pb-1 ${helveticaNeue.className} list-disc">
                                                        v) Xcelcure Technologies LLP believes in its sole discretion that User’s actions may cause legal liability for such User, 
                                                        other Users or for Xcelcure Technologies LLP or are contrary to the interests of the Site/Application.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Once temporarily suspended, indefinitely suspended or terminated, the User may not continue to use the Site/Application 
                                                under the same account, a different account or re-register under a new account. On termination of an account due to the 
                                                reasons mentioned herein, such User shall no longer have access to data, messages, files and other material kept on the 
                                                Site/Application by such User. The User shall ensure that he/she/it has continuous backup of any medical services the 
                                                User has rendered in order to comply with the User’s record keeping process and practices.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Termination of this agreement will not prejudice accrued rights of either Xcelcure Technologies LLP or You.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Clauses pertaining to Indemnification, Liability, Intellectual Property Ownership, Term and Termination, Notice and 
                                                Applicable Law and Dispute Resolution and such other provisions which are intended to survive the termination, 
                                                shall survive the expiry/termination of these User Terms in accordance with their terms.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• DISCLAIMER
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                <strong>No Warranty</strong><br></br>
                                                Although all efforts are made to ensure that information and content provided as part of the Site/Application are correct 
                                                at the time of inclusion on the Site/Application, however, there is no guarantee to the accuracy of the Information. 
                                                We do not make representations or warranties as to the fairness, completeness, or accuracy of Information on the Site/Application. 
                                                There is no commitment to update or correct any information that appears on the Internet or on the Site/Application. 
                                                Information is supplied upon the condition that the persons receiving the same will make their own determination as 
                                                to its suitability for their purposes prior to use or in connection with the making of any decision. Any use of the 
                                                Site/Application or the information is at your own risk.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                <strong>No Liability</strong><br></br>
                                                The Services provided by Xcelcure Technologies LLP or any of its licensors or service providers/partners are provided 
                                                on an “as is” and “as available” basis, and without any warranties or conditions (express or implied, including the implied 
                                                warranties of merchantability, accuracy, fitness for a particular purpose, title and non-infringement, arising by 
                                                statute or otherwise in law or from a course of dealing or usage or trade). Xcelcure Technologies LLP does not 
                                                provide or make any representation, warranty or guarantee, express or implied about the Site/Application or the Services. 
                                                Xcelcure Technologies LLP does not guarantee the accuracy or completeness of any content or information provided by 
                                                users on the Site/Application. To the fullest extent permitted by law, Xcelcure Technologies LLP disclaims all liability 
                                                arising out of the Your use or reliance upon the Site/Application, the Services, representations and warranties made by 
                                                other users or any content or information provided by the users on the Site/Application.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• AUTHORITY TO XCELCURE TECHNOLOGIES LLP
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                The Customer/You hereby authorizes Xcelcure Technologies LLP to carry out his instructions, effecting such 
                                                transactions as may be permitted by Xcelcure Technologies LLP from time to time, in accordance with these 
                                                Terms & Conditions and such other terms as may be specified by.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• EVIDENCE OF TRANSACTIONS
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                For any transaction which may be permitted by Xcelcure Technologies LLP from time to time, Xcelcure Technologies LLP’s 
                                                own records of such transactions maintained through computer systems or otherwise, shall be accepted as conclusive and 
                                                binding for all purposes. The record of The Transaction as generated from the systems of Xcelcure Technologies LLP shall 
                                                be conclusive proof of the genuineness and accuracy of such transactions.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• RESTRICTIONS ON USE
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Xcelcure Technologies LLP owns and holds all the rights for the information, contents, audio, video, logos and trademarks 
                                                contained in this Site/Application. Any reproduction, modification, creation of derivate works, distribution, transmission, 
                                                copying, selling, displaying, publishing or using any of the information, contents, audio, video, logos and trademarks 
                                                contained in this Site/Application for any purpose whatsoever, whether electronically or otherwise, without the prior 
                                                written permission of Xcelcure Technologies LLP is strictly prohibited. Any violation of this provision would be strictly 
                                                dealt with. You may download material displayed on this Site/Application for your personal use only, provided that you 
                                                also retain the clauses pertaining to all copyright and other proprietary notices contained in the materials. 
                                                You acknowledges and affirms that You shall not:
                                                <ul className='mb-4 pl-5 pt-4'>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                        Engage in fraudulent, abusive or illegal activity, including but not limited to any communication or 
                                                        solicitation designed or intended to fraudulently obtain the password or any private information of any use.
                                                    </li>
                                                    <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                        Use the Site/Application to violate the security of any computer network, crack passwords or security 
                                                        encryption codes, transfer or store illegal material including threatening or obscene material or engage 
                                                        in any kind of illegal activity.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Although Xcelcure Technologies LLP may, from time to time, monitor or review any facilities, if established or 
                                                otherwise offered at the Site/Application for discussions, chats, postings, transmissions, bulletin boards, and the 
                                                like on the Site/Application, Xcelcure Technologies LLP is under no obligation to do so and assumes no responsibility 
                                                or liability arising from the content of any such locations nor for any error, defamation, libel, slander, omission, 
                                                falsehood, obscenity, pornography, profanity, danger, or inaccuracy contained in any information contained within 
                                                such locations on the Site/Application. You are prohibited from posting or transmitting any unlawful, threatening, 
                                                libelous, defamatory, obscene, scandalous, inflammatory, pornographic, or profane material or any material that 
                                                could constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability, 
                                                or otherwise violate any law. Xcelcure Technologies LLP will fully cooperate with any law enforcement authorities 
                                                or court order requesting or directing Xcelcure Technologies LLP to disclose the identity of anyone posting any 
                                                such information or materials.</li>
                                        </ul>
                                    </li>
                                    <li>• USE OF INFORMATION
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                The content is available for informational purposes only. The posting of contents and access to this Site/Application 
                                                does not render, either explicitly or implicitly, any provision of Services or products by us. All advertisements 
                                                contain only an indication of cover offered by the products. For more information, please read the policy wordings 
                                                before concluding a sale.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• RESERVATION OF RIGHTS
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                We reserve the right to change, modify, add to, or remove discounts, portions of these terms of use at any time, 
                                                subject to IRDAI regulations as amended time to time & Xcelcure Technologies LLP’s policy.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• PRIVACY POLICY
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                In the process of using this Site/Application, the Privacy Policy as set forth in the Site/Application www.Xcelcure Technologies LLP.com shall be applicable.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• MODIFICATION OF THE SERVICE AND USER TERMS
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                IXcelcure Technologies LLP reserves the right, at its sole discretion, to modify or replace, in part or full, any 
                                                of these User Terms, or change, suspend, block, discontinue or restrict Your use to all or any feature of the 
                                                Service or Site/Application at any time.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Xcelcure Technologies LLP shall not be required to notify You of any changes made to these User Terms. The revised 
                                                User Terms shall be made available on the Site. You are requested to regularly visit the Site to view the most 
                                                current User Terms. It shall be Your responsibility to check these User Terms periodically for changes. 
                                                Your continued use of the Site/Application constitutes acceptance of the changes and an Agreement to 
                                                be bound by User Term, as amended.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• NOTICE
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                Notices under these Terms & Conditions may be given by Xcelcure Technologies LLP to the Customer in writing by 
                                                delivering them to the last address given by the Customer. Customer may give notice to Xcelcure Technologies LLP 
                                                by delivering them to the address mentioned on Site/Application. In the case of hand delivery, cable, telex, facsimile 
                                                notices or electronic communication notices or instructions will be deemed served 7 days after posting or upon receipt 
                                                as the case may be. Documents, which may be sent by electronic communication between the parties, may be in the 
                                                form of an electronic mail, an electronic mail attachment, or in the form of an available download from the 
                                                Site/Application. Xcelcure Technologies LLP shall be deemed to have fulfilled any legal obligation to deliver 
                                                to the Customer if any such document is sent via electronic delivery.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• EXCLUSIVE AGREEMENT
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                You agree that these User Terms are the complete and exclusive statement of agreement supersede any proposal or prior 
                                                agreement, oral or written, and any other communications between you and Xcelcure Technologies LLP relating to the 
                                                subject matter of these User Terms. These User Terms, as the same may be amended from time to time, will prevail 
                                                over any subsequent oral communications between you and the Site/Application and/or Xcelcure Technologies LLP.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• ASSIGNMENT
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                You shall not assign Your rights under these User Terms without prior written approval of Xcelcure Technologies LLP. 
                                                Xcelcure Technologies LLP can assign its rights under the User Terms to any affiliate.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• NO WAIVER
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                Xcelcure Technologies LLP or any of its third party service providers etc. shall not be deemed to have waived any of 
                                                its/their rights or remedies hereunder, unless such waiver is in writing. No delay or omission on the part of Xcelcure 
                                                Technologies LLP or service providers, in exercising any rights or remedies shall operate as a waiver of such rights 
                                                or remedies or any other rights or remedies. A waiver on any one occasion shall not be construed as a bar or waiver 
                                                of any rights or remedies on future occasions.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• APPLICABLE LAW AND DISPUTE RESOLUTION
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                These User Terms are subject to the laws of India. Any dispute, claim or controversy arising out of or relating to 
                                                these User Terms or the breach, termination, enforcement, interpretation or validity thereof or the use of the Site, 
                                                the Service or the Application (collectively, “Disputes”) the parties shall attempt to settle the same amicably, 
                                                through negotiation and consultation at such offices of Xcelcure Technologies LLP as Xcelcure Technologies LLP may 
                                                designate. In the event the dispute is not resolved internally between after at least 30 (thirty) days of negotiation, 
                                                in good faith, the same shall be subject to binding and final arbitration in accordance with the Arbitration and 
                                                Conciliation Act, 1996 as amended from time to time or in case the Arbitration and Conciliation Act, 1996 is no 
                                                longer in force, as per any law relating to arbitration in force at the time of such reference. The reference 
                                                shall be made to a sole arbitrator appointed by Xcelcure Technologies LLP. The place of the arbitration shall 
                                                be Bengaluru, Karnataka, unless otherwise mutually agreed by Xcelcure Technologies LLP and You in writing. 
                                                Subject to the above, any Dispute will be subject to the exclusive jurisdiction of courts in Bangalore, India.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• JURISDICTIONAL ISSUES
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Unless otherwise expressly set forth herein, Xcelcure Technologies LLP makes no representation that materials on 
                                                this Site/Application are appropriate or available for use in any location. Those who choose to access this 
                                                Site/Application do so on their own initiative and are responsible for compliance with local laws. The 
                                                Services/products which are part of the Site/Application do not constitute an offer to sell or a solicitation 
                                                of an offer to buy any policies/products to any person in any jurisdiction where it is unlawful to make such an offer or solicitation.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                However, please note that no person shall take out or renew any policy of insurance in respect of any property 
                                                in India or any ship or other vessel or aircraft registered in India with an insurer whose principal place of 
                                                business is outside India without permission of Insurance Regulatory and Development Authority of India.
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                Except as specifically set forth herein the information contained on this Site/Application is not an offer to sell or any 
                                                security, insurance product or other product or service. No security, insurance product or other product or service 
                                                is offered or will be sold in any jurisdiction in which such offer or solicitation, purchase or sale would be unlawful 
                                                under the securities, insurance or other laws of such jurisdiction. Some products and Services may not be available
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• COVID-19 UPDATE:
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                The novel Coronavirus outbreak might negatively impact our services in the coming days. You might face delays and 
                                                inconveniences, and we apologise for all of it in advance. Rest assured that we’re working hard to minimise its impact 
                                                and continue to serve you without letting down our standards. We are grateful for your support and patience in these 
                                                testing times. Feel free to contact us for any queries or concerns.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• CONTACT
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-decimal">
                                                You authorize Xcelcure Technologies LLP to call, send SMS and email on the contact number and email ID 
                                                (made available by you on our Site/Application) and offer you information and services for the product/Services 
                                                you have opted for. You authorize us to call, SMS or email You for the mentioned purpose, irrespective of whether you 
                                                register with the NDNC registry. Xcelcure Technologies LLP may from time to time send by e-mail or otherwise, 
                                                information relating to products and services offered by its Affiliates, general information related to financial 
                                                and other services, life and general insurance products. For sake of clarification, abovementioned right of Xcelcure 
                                                Technologies LLP shall continue to be in effect irrespective of Your termination of Agreement/deletion of Your Account.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>• GRIEVANCES
                                        <ul className='mb-4 pl-5 lg:pb-0 pb-0'>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                For grievances, please see Grievance Redressal
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                <strong>Xcelcure Technologies LLP</strong>
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                <strong>Registered Office:</strong> Lokenath Apartment, 3rd Floor. 3D, Goursundar Sett Lane. Kolkata 700050
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                <strong>City Office:</strong> Module 118, SDF Building, GP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091
                                            </li>
                                            <li className="text-[#69697B] font-medium text-sm lg:text-base lg:pb-2 pb-1 ${helveticaNeue.className} list-disc">
                                                TERMS & CONDITIONS GOVERNING THE USE OF XCELCURE TECHNOLOGIES LLP’S WEBSITE BY VISITORS, CUSTOMERS AND REGISTERED USERS.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* wrapper section ends here */}

    </div>
  )
}

export default page