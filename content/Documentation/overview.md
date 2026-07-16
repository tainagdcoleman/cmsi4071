---
title: Overview
---

## Notes About Course Format

The **Senior Project I** course, introduces the essential software engineering principles that guide the design, management, implementation, deployment, and maintenance of software development projects. We introduce the topics through lectures and in-class work, but the best way to understand this subject is to experience it first-hand, with chances to "get your hands dirty under the hood". Therefore, most of your time will be spent designing, managing, and implementing medium- to large-sized group projects in \[usually\] four- to six-person teams. The quality of the final product will depend upon both the abilities of the students on the teams and the dedication of each class member. The final project products themselves will be presented to the LMU community at a special meeting during \[or the week before\] finals week.

In order to direct the development effort and to evaluate the projects, students complete several activities. Each of these activities is a somewhat scaled-down version of "real world" software engineering activities. The intent of the course is to acquaint the student with how to perform these activities and why each is important; a secondary course goal is to expose the students to as much of the available software engineering methodology as possible.

>[!note]
> In this regard, a significant portion of the project development effort is spent in the documentation of the project, including its proposal, solution analysis, requirements specification, architectural and process design, development plan, testing plan, and scheduled deliveries and demonstration. All of these are essential parts of the process as practiced in industry. Each of these documentation exercises is treated as one of a set of customer-deliverable entities, or "deliverables". The full set of deliverables is combined into the **software development library \[SDL\]**. The SDL used to be a 3-ring binder with each document in its own section, but in modern software development we don't use paper as much, so we save trees and use GitHub. When you read through these web pages, you may find references to "sections", so that's where those references come from.
>
> The SDL is turned in for each deliverable according to the schedule in the table below, and is also submitted for archiving purposes at the end of the term.

Also you should note: in the real world of software development, *you will spend a significant amount of time doing things that **ARE NOT** code* You will be writing documents, attending design meetings, holding code reviews, planning and reporting all of your work, asking for help or guidance, dealing with customers and team members, and many other items and activites too numerous to list here. To that end, I will do my best **to give you as realistic an experience as possible** by providing two things:

1.  exposure and practice doing some \[not all\] of these activites so you get a chance to do them in a safe environment and to see why they are important; and
2.  time in class to work on your code, have group meetings, and do some other group tasks that are made more difficult by the distributed nature of the class team environment

## Deliverables

Each project activity will focus on a particular "deliverable,", a written and/or spoken *work product* that describes a particular part of the project. Each one of these is delivered to the customer \[your instructor\] and their associated due dates are shown in [[deliverables|Table 1]]. Each of them is described in detail on its own separate web page. Note that the grade weights for each deliverable are listed in [[deliverables|Table 2]]. A complete table of contents for your entire SDL is shown below on this page under [[#SDL Outline]]. The section numbers are what you should use for your documents in your repositories on GitHub, which is where the documents will be submitted.

In industry, many of these deliverables are separate documents. For example, there is a "Software Development Plan \[SDP\]", a "Software Requirements Specification \[SRS\]", a "Software Interface Configuration Document \[ICD\]", and many others. Each of the repository sections for the project SDL corresponds to one of these industry documents. This is why the repo has so many sections, and incidentally is why the sections seem to contain some redundant information. The idea of the LMU project SDL is to provide each student with the opportunity to create one or more of these documents, and to become familiar with many of the different types of documentation required in industry. The results become the SDL for this course.

It is recommended that each team member on the project be assigned at least one section of the project SDL, and they will be the primary person for that deliverable/document section. One team member may be designated as the notebook master editor, or "book boss", whose job is to ensure that required deliverables/sections are completed, and committed to GitHub on time. The book boss should also set deadlines for when the other team members must submit their assigned deliverable, in order to provide themself enough time to review the entire document from start to finish to prevent inconsistencies.

**Being a book boss does not mean writing the entire document** and does not mean doing all the typing. Remember: The primary responsibility of the book boss is to make sure that the document is turned in on time, has been read all the way through by at least one person and is a product of which the entire team can be proud.

Each deliverable/section will be evaluated after submission, and feedback will be provided to the team in the form of a "document feedback" text file. As you would have in industry, you will have a second chance at the document; if you incorporate the changes specified in the feedback file by the end of the term, you will get full credit for that deliverable. Note that several specific deliverables are handled this way.

The bottom line on "deliverables", then, is that each deliverable is a section in the SDL, with some deliverables also requiring oral presentations. Also note that due to semester time constraints, there are several deliverables that are due at the same time, with a corresponding presentation for all pertinent sections for that date.

> [!info] Deliverables, due dates, and grade weights
> Table 1 (deliverables and due dates) and Table 2 (deliverables and grade
> weights) live on the [[deliverables|Deliverables and Due Dates]] page,
> along with the status-report details and project grading breakdown.

## Lessons Learned

Here are some comments from previous years that may help you in this class (from Dr. Johnsons website).

-   **Be careful of using a technology in your project** unless someone on the team knows it well. You'll wind up wasting all your time learning to use the new thing, and won't have enough time left to finish the project.
-   **When making a schedule**, try to work backwards from the end. Don't underestimate the time you will need — schedule extra time wherever possible.
-   **Do the design first**. Make sure everyone understands the design, particularly the way the parts work together (interfaces).
-   **Ask for help** from the professors early and often.
-   **Always be on time** to scheduled meetings.
-   **Take version control seriously**.
-   **Hold firm to scheduled delivery dates**.
-   **Warn people ahead of time** what to expect... a lot of work is involved and anyone that doesn't have the time or perseverance should drop the course.
-   **Everything takes a lot longer than you think it will**, and even longer than that.
-   **This has been the most worthwhile course** I have taken since I learned to write in the first grade... I've learned a lot about computing, time management, people management, and my ability to stay on the computer for days at a time. I even liked the course.
-   **I think we need to strictly follow** all the scheduled deadlines so that we would not fall behind in any stages of the project. This is important because we always have to spend time on matters relevant to the project that we never have expected, especially towards the end of the semester.
-   **All of us**, in my opinion, should establish an attitude of being very willing to help one another. Spending time to help another person is not a waste of your own time. In fact, it helps you to learn and speeds up the progress of completing the project simultaneously.

## SDL Outline

The following outline shows the format for *your project SDL*.

You will notice that there are things are hightlighted **green** and things that are marked with *NOTE: you don't need to do this section!*. There is a reason for this layout. I have given you the full listing here the "Table of Contents (TOC) of the industry standard CMMI SDL so that you can see what it looks like, that way you have the full picture of the industry documents."

**HOWEVER, you only need to do the parts that are highlighted!**

Some changes are expected in industry documentation (this is called "tailoring"), but the general format and flow should be as shown. Again, anything that is highlighted **green** is something you are responsible for doing in this course. Sections 11, 12, 13, and 14 are optional but may have some value to you during your development effort.


<pre>
               <strong class="lit">1.0  Preliminary Project Proposal Document</strong>
               <strong class="lit">2.0  Proposal Document and Presentation Slides</strong>

      [[ NOTE: you don't need to do this section! ]]
               3.0  Needs Analysis
               3.1      Introduction
               3.2      Audience
               3.3      Stakeholders
               3.4      Critical Success Factors
               3.5      Conceptual Solution Design

               <strong class="lit">4.0  Software Development Plan</strong>
               <strong class="lit">4.1      Plan Introduction</strong>
               <strong class="lit">4.1.1    Project Deliverables</strong>
               <strong class="lit">4.2      Project Resources</strong>
               <strong class="lit">4.2.1    Hardware Resources</strong>
               <strong class="lit">4.2.2    Software Resources</strong>
               <strong class="lit">4.3      Project Organization</strong>
               <strong class="lit">4.4      Project Schedule</strong>
               <strong class="lit">4.4.1    PERT / GANTT Chart</strong>
               <strong class="lit">4.4.2    Task / Resource Table</strong>
               <strong class="lit">4.4.3    Class Schedule</strong>

               <strong class="lit">5.0  Requirements Specification</strong>
               <strong class="lit">5.1      Introduction</strong>
               <strong class="lit">5.2.     CSCI Component Breakdown</strong>
               <strong class="lit">5.3      Functional Requirements by CSC</strong>
               <strong class="lit">5.3.1    Functional Requirement 1</strong>
                             .
                             .
                             .
               <strong class="lit">5.3.n    Functional Requirement n</strong>
               <strong class="lit">5.4      Performance Requirements by CSC</strong>
               <strong class="lit">5.4.1    Performance Requirement 1</strong>
                             .
                             .
                             .
               <strong class="lit">5.4.n    Performance Requirement n</strong>
               <strong class="lit">5.5      Project Environment Requirements</strong>
               <strong class="lit">5.5.1    Development Environment Requirements</strong>
               <strong class="lit">5.5.2    Execution Environment Requirements</strong>

               <strong class="lit">6.0  Architectural Design Document</strong>
               <strong class="lit">6.1.     Introduction</strong>
               <strong class="lit">6.1.1    System Objectives</strong>
               <strong class="lit">6.1.2    Hardware, Software, and Human Interfaces</strong>
               <strong class="lit">6.2.     CSCI Descriptions</strong>
               <strong class="lit">6.2.1    Concept of Execution</strong>
               <strong class="lit">6.2.2    Interface Design</strong>
               <strong class="lit">6.2.2.1  Interface Identification and Diagrams</strong>
               <strong class="lit">6.2.2.2  Project Interactions</strong>
               <s>6.3      Preliminary User Manual</s> [[ This will be separate in your repo ]]


      [[ NOTE: Normally this is section 7, but it's re-numbered here to be part of the SDD ]]
               <strong class="lit">6.4  Detailed Design Specification</strong>
               <s>6.4.1      Introduction</s> [[ You don't need to do this section ]]
               <strong class="lit">6.5      Detailed Design Description</strong>
               <strong class="lit">6.5.1    CSC 1 Descriptions</strong>
               <strong class="lit">6.5.1.1  CSU 1 Description</strong>
                              .
                              .
                              .
               <strong class="lit">6.5.1.n  CSU n Description</strong>

               <strong class="lit">    &lt;similar sections for all CSCs 1 through m-1&gt;</strong>
               <strong class="lit">&nbsp;</strong>
               <strong class="lit">6.5.m    CSC m Descriptions</strong>
               <strong class="lit">6.5.m.1  CSU 1 Description</strong>
                              .
                              .
                              .
               <strong class="lit">6.5.m.n  CSU n Description</strong>
               <strong class="lit">6.6      Database CSU Design Description (if applicable)</strong>
               <strong class="lit">6.6.1    CSU 1 Description</strong>
                              .
                              .
                              .
               <strong class="lit">6.6.n    CSU n Description</strong>
               <strong class="lit">6.7      Detailed Interface Descriptions</strong>

      [[ NOTE: you don't need to do this section! ]]
               8.0  Process Model
               8.1      Introduction
               8.2      Data Provision / Translation
               8.3      Data Processing
               8.4      Internal Data Translation

      [[ NOTE: you don't need to do this section! ]]
               9.0  Configuration Management Plan

              <strong class="lit">10.0  Testing</strong>
              <strong class="lit">10.1      Unit Test Plan</strong>
              <strong class="lit">10.1.1    Unit Test Descriptions</strong>
              <strong class="lit">10.1.1.1  Unit Test 1</strong>
                              .
                              .
                              .
              <strong class="lit">10.1.1.n  Unit Test n</strong>
              <strong class="lit">10.1.2    Unit Test Requirements Trace</strong>
              <strong class="lit">10.2      Integration Test Plan</strong>
              <strong class="lit">10.2.1    Integration Test Descriptions</strong>
              <strong class="lit">10.2.1.1  Integration Test 1</strong>
                              .
                              .
                              .
              <strong class="lit">10.2.1.n  Integration Test n</strong>
              <strong class="lit">10.2.2    Integration Test Requirements Trace</strong>

      [[ NOTE: These sections are optional. ]]
              11.0  Lessons Learned
              12.0  Document History
              13.0  Reviewer/Auditor Comments
              14.0  Notes

      [[ NOTE: you don't need to do this section! ]]
              15.0  Project Source Code
              15.1      Description of Code Location in CM Repository

            
</pre>


1.  [Request for Proposal (RFP)](https://bjohnson.lmu.build/sampleproject/01_SampleRFP.doc)
2.  [Proposal Document](https://bjohnson.lmu.build/sampleproject/02_Proposal.doc)
3.  [Statement of Work Document](https://bjohnson.lmu.build/sampleproject/03_StmtOfWork.doc)
4.  [Waterfall Requirements Specification](https://bjohnson.lmu.build/sampleproject/04_ReqSpecWaterfall.doc)
5.  [Agile Requirements Specification](https://bjohnson.lmu.build/sampleproject/04_ReqSpecAgile.doc)
6.  [Software Development Plan](https://bjohnson.lmu.build/sampleproject/05_SW-DevPlan.docx)
7.  [Software Test Plan/Procedure](https://bjohnson.lmu.build/sampleproject/06_TestPlanProc.docx)
8.  [Software Design Description](https://bjohnson.lmu.build/sampleproject/07_DesignDescrip.docx)
9.  [TempAppConv Class code](https://bjohnson.lmu.build/sampleproject/TempConvApp.java)
10.  [Button Panel Class code](https://bjohnson.lmu.build/sampleproject/ButtonPanel.java)
11.  [Input Panel Class code](https://bjohnson.lmu.build/sampleproject/InputPanel.java)
12.  [TempAppConv HTML Main Page code](https://bjohnson.lmu.build/sampleproject/tempconv.html)
13.  ["About" Page HTML Page code](https://bjohnson.lmu.build/sampleproject/aboutpage.html)

---

*Adapted from [Dr. B.J. Johnson's CMSI 4071 course notes](https://bjohnson.lmu.build/cmsi4071web/overview.html).*
*Copyright (c) 2005-2025, B.J. Johnson and LMU.*
