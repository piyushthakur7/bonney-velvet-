/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const PolicyPage = ({ title, content }: { title: string; content: React.ReactNode }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
    <h1 className="text-4xl font-bold text-brand tracking-tight">{title}</h1>
    <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 leading-relaxed">
      {content}
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <PolicyPage 
    title="Privacy Policy" 
    content={
      <>
        <div className="space-y-6">
          <p>BONNY VELVET website is owned by <strong>DARSHAN.R.BHAT</strong>, which is a data controller of your personal data.</p>
          <p>We have adopted this Privacy Policy, which determines how we are processing the information collected by BONNY VELVET, which also provides the reasons why we must collect certain personal data about you. Therefore, you must read this Privacy Policy before using BONNY VELVET website.</p>
          <p>We take care of your personal data and undertake to guarantee its confidentiality and security.</p>
        </div>

        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-zinc-900">Personal information we collect:</h2>
          <p>When you visit the BONNY VELVET, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the installed cookies on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products you view, what websites or search terms referred you to the Site, and how you interact with the Site. We refer to this automatically-collected information as “Device Information.” Moreover, we might collect the personal data you provide to us (including but not limited to Name, Surname, Address, payment information, etc.) during registration to be able to fulfill the agreement.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Why do we process your data?</h2>
          <p>Our top priority is customer data security, and, as such, we may process only minimal user data, only as much as it is absolutely necessary to maintain the website. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding website usage. This statistical information is not otherwise aggregated in such a way that it would identify any particular user of the system.</p>
          <p>You can visit the website without telling us who you are or revealing any information, by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the website’s features, or you wish to receive our newsletter or provide other details by filling a form, you may provide personal data to us, such as your email, first name, last name, city of residence, organization, telephone number. You can choose not to provide us with your personal data, but then you may not be able to take advantage of some of the website’s features. For example, you won’t be able to receive our Newsletter or contact us directly from the website. Users who are uncertain about what information is mandatory are welcome to contact us via <strong>darshanbhat33@gmail.com</strong>.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Your rights:</h2>
          <p>If you are a European resident, you have the following rights related to your personal data:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The right to be informed.</li>
            <li>The right of access.</li>
            <li>The right to rectification.</li>
            <li>The right to erasure.</li>
            <li>The right to restrict processing.</li>
            <li>The right to data portability.</li>
            <li>The right to object.</li>
            <li>Rights in relation to automated decision-making and profiling.</li>
          </ul>
          <p>If you would like to exercise this right, please contact us through the contact information below.</p>
          <p>Additionally, if you are a European resident, we note that we are processing your information in order to fulfill contracts we might have with you (for example, if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information might be transferred outside of Europe, including Canada and the United States.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Links to other websites:</h2>
          <p>Our website may contain links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for such other websites or third parties' privacy practices. We encourage you to be aware when you leave our website and read the privacy statements of each website that may collect personal information.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Information security:</h2>
          <p>We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We keep reasonable administrative, technical, and physical safeguards to protect against unauthorized access, use, modification, and personal data disclosure in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Legal disclosure:</h2>
          <p>We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Contact information:</h2>
          <p>If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may send an email to <strong>darshanbhat33@gmail.com</strong>.</p>
        </section>
      </>
    } 
  />
);

export const Terms = () => (
  <PolicyPage 
    title="Terms & Conditions" 
    content={
      <>
        <div className="space-y-6">
          <p>Welcome to BONNY VELVET!</p>
          <p>These terms and conditions outline the rules and regulations for the use of BONNY VELVET's Website, located at <a href="https://bonnyvelvet.com" className="text-brand hover:underline">https://bonnyvelvet.com</a>.</p>
          <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use BONNY VELVET if you do not agree to take all of the terms and conditions stated on this page.</p>
        </div>

        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-zinc-900">Cookies:</h2>
          <p>The website uses cookies to help personalize your online experience. By accessing BONNY VELVET, you agreed to use the required cookies.</p>
          <p>A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you.</p>
          <p>We may use cookies to collect, store, and track information for statistical or marketing purposes to operate our website. You have the ability to accept or decline optional Cookies. There are some required Cookies that are necessary for the operation of our website. These cookies do not require your consent as they always work. Please keep in mind that by accepting required Cookies, you also accept third-party Cookies, which might be used via third-party provided services if you use such services on our website, for example, a video display window provided by third parties and integrated into our website.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">License:</h2>
          <p>Unless otherwise stated, BONNY VELVET and/or its licensors own the intellectual property rights for all material on BONNY VELVET. All intellectual property rights are reserved. You may access this from BONNY VELVET for your own personal use subjected to restrictions set in these terms and conditions.</p>
          <p>You must not:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Copy or republish material from BONNY VELVET</li>
            <li>Sell, rent, or sub-license material from BONNY VELVET</li>
            <li>Reproduce, duplicate or copy material from BONNY VELVET</li>
            <li>Redistribute content from BONNY VELVET</li>
          </ul>
          <p>This Agreement shall begin on the date hereof.</p>
          <p>Parts of this website offer users an opportunity to post and exchange opinions and information in certain areas of the website. BONNY VELVET does not filter, edit, publish or review Comments before their presence on the website. Comments do not reflect the views and opinions of BONNY VELVET, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, BONNY VELVET shall not be liable for the Comments or any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
          <p>BONNY VELVET reserves the right to monitor all Comments and remove any Comments that can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.</p>
          <p>You warrant and represent that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent, or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material, which is an invasion of privacy.</li>
            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>
          <p>You hereby grant BONNY VELVET a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats, or media.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Hyperlinking to our Content:</h2>
          <p>The following organizations may link to our Website without prior written approval:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
            <li>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
          </ul>
          <p>These organizations may link to our home page, to publications, or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>
          <p>We may consider and approve other link requests from the following types of organizations:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Commonly-known consumer and/or business information sources;</li>
            <li>Dot.com community sites;</li>
            <li>Associations or other groups representing charities;</li>
            <li>Online directory distributors;</li>
            <li>Internet portals;</li>
            <li>Accounting, law, and consulting firms; and</li>
            <li>Educational institutions and trade associations.</li>
          </ul>
          <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of BONNY VELVET; and (d) the link is in the context of general resource information.</p>
          <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</p>
          <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to BONNY VELVET. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
          <p>Approved organizations may hyperlink to our Website as follows:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>By use of our corporate name; or</li>
            <li>By use of the uniform resource locator being linked to; or</li>
            <li>Using any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
          </ul>
          <p>No use of BONNY VELVET's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Content Liability:</h2>
          <p>We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are raised on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Reservation of Rights:</h2>
          <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Removal of links from our website:</h2>
          <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links, but we are not obligated to or so or to respond to you directly.</p>
          <p>We do not ensure that the information on this website is correct. We do not warrant its completeness or accuracy, nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Disclaimer:</h2>
          <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Limit or exclude our or your liability for death or personal injury;</li>
            <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.</p>
          <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
        </section>
      </>
    } 
  />
);

export const RefundPolicy = () => (
  <PolicyPage 
    title="Returns & Refunds Policy" 
    content={
      <>
        <div className="space-y-6">
          <p>You are entitled to cancel your order within 30 days without giving any reason for doing so.</p>
          <p>The deadline for canceling an order is 30 days from the date you received the goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
          <p>In order to exercise your right of cancellation, you must inform us of your decision by means of a clear statement.</p>
          <p>You can inform us of your decision by e-mail: <strong>bonnyvelvet33@gmail.com</strong></p>
          <p>We will reimburse you no later than 30 days from the day on which we receive the returned goods. We will use the same means of payment as you used for the order, and you will not incur any fees for such reimbursement.</p>
        </div>

        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-zinc-900">Conditions for returns:</h2>
          <p>In order for the goods to be eligible for a return, please make sure that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The goods were purchased in the last 30 days</li>
            <li>The goods are in the original packaging</li>
          </ul>
          <p>The following goods cannot be returned:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The supply of goods made to your specifications or clearly personalized.</li>
            <li>The supply of goods which according to their nature are not suitable to be returned, for example goods which deteriorate rapidly or where the date of expiry is over.</li>
            <li>The supply of goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
            <li>The supply of goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
          </ul>
          <p>We reserve the right to refuse returns of any merchandise that does not meet the above return conditions at our sole discretion.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Returning Goods</h2>
          <p>You are responsible for the cost and risk of returning the goods to us. You should send the goods to the following address:</p>
          <p className="font-mono text-sm bg-zinc-100 p-4 rounded-lg">bonnyvelvet33@gmail.com</p>
          <p>We cannot be held responsible for goods damaged or lost in return shipment. Therefore, we recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the goods or proof of received return delivery.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Gifts:</h2>
          <p>If the goods were marked as a gift when purchased and then shipped directly to you, you'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to you.</p>
          <p>If the goods weren't marked as a gift when purchased, or the gift giver had the order shipped to themselves to give it to you later, We will send the refund to the gift giver.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Contact Us</h2>
          <p>If you have any questions about our Returns and Refunds Policy, please contact us by e-mail: <strong>bonnyvelvet33@gmail.com</strong></p>
        </section>
      </>
    } 
  />
);

export const ShippingPolicy = () => (
  <PolicyPage 
    title="Shipping Policy" 
    content={
      <>
        <p>We deliver PAN India.</p>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">1. Shipping Charges</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Free shipping on orders above ₹499.</li>
            <li>₹80 shipping fee for orders below ₹499.</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">2. Delivery Time</h2>
          <p>Orders are typically processed within 24-48 hours and delivered within 3-7 business days.</p>
        </section>
      </>
    } 
  />
);
