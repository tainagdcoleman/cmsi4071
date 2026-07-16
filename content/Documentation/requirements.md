---
title: Requirements Specification (SRS)
---

## What are good requirements?

The Requirements Document is intended to capture the low-level requirements for the project, and to elaborate the details of the contract between the instructor and the students regarding the completed project.

At the highest level, all projects have the same two requirements:

First, each must demonstrate mastery of fundamental concepts in computer science and software engineering through the specification, design, development, and presentation of a working system
Second, each team must reflect a level of integrity consistent with university policy and established professional ethics. It is assumed that all students will treat their peers with respect at all times, and will acknowledge in both documents and code the contributions of others.
However, these only apply at the highest level, and are not acceptable as "requirements" for the project. Instead, requirements are intended to show what the system is going to do, in an itemized and provable way. Requirements are selected so as to decompose the system operation into individual pieces, and normally each requirement is numbered. The numbers are used to track the method of verification, to prove that the software meets the requirements and does what it's supposed to do. (The shorthand for this is the expression "works as advertised".)

The number of methods for determining what to list as system requirements is large. The topic of requirements analysis has been covered by many books and many more websites. It seems everyone has her own method, and everyone feels their method is best. However, it all boils down to the simple fact that the system operation must be specified in a very detailed fashion, so that all the operations are listed, and so that they can be proved to be correct. Check out the [[Requirement Analysis]] for a few more details on the subject.

For this project, the Software Requirements Specification (SRS) will be a deliverable section of the SDL. It will have the format for which an outline is provided in the next section. The general idea is to itemize all the functional and performance requirements of the system, using "shall" statements. Focus on "what" the system will do, not "how" it will do it. Try to remember that the test plan will be used to prove that the functions work properly and meet the requirements.

Note that there are two sections, "Functional" requirements and "Performance" requirements. The difference between these is the dividing line between what the project needs to do to function properly (e.g., "the system shall provide clickable buttons for . . . .") and what the project needs to do to operate properly (e.g., "the system shall . . . when the 'CLEAR' button is clicked.").

## Outline of Deliverable

The document should be structured as follows (sections are explained below):

![[outline.png]]

## Requirements Introducion Section

The introductory paragraph should consist of a one-paragraph description of the system being designed, and should include a high-level diagram of the system components. It should end with an outline of the document. The **ConOps** [LINK] and other documents should be used to provide any additional background information needed; postpone those details to those documents and don't include them here.

## CSCI Component Breakdown Section

CSCI stands for Computer Software Configuration Item and is the top level of the software divisions. The CSCI is usually the name of the software application. It comprises Computer Software Components, or CSCs, each of which is made up of Computer Software Units, or CSUs. A CSU is composed of modules. So, there is the hierarchy of the different parts.

For example, let's say your project is a database application with a GUI client front end written in Java, and a server written in a scripting language like Ruby. Further, let the server have several flavors based on the type of information to be extracted from the database; these servers will be dynamically started as they are needed, and shut down at the end of each service performed. Let's say the program is called BarnDoor, for unknown reasons. The module hierarchy in this section of the requirements document might appear as follows:

![[barndoor.png]]

## Functional Requirements Section

The introduction to the functional section should describe the features that the completed system can be expected to have. It should describe what the completed system will do. Avoid describing how it will be accomplished. Implementation details will be included in other documents. The rest of this section will be divided into sub-sections, one for each of the parts or CSCs of the system. In fact, using the CSCs that are defined in the previous section of the SRS is a good way to show the way the system is divided up, known as the functional decomposition of the system.

Each subsection should reference a particular functional requirement group. Each functional requirement in a subsection should be given a meaningful name which describes the requirement. For example, if the first functional requirement group is to provide the graphical user interface to the system, then the first subsection might be labeled:

```
    5.3.1 Graphical User Interface
```

A brief description of the functionality (1-2 paragraphs, as needed) would follow, as the introduction for the functional section. After that would come the individual, specific, detailed requirements statements for the GUI part of the project. All requirements must be structured in the "shall statement" format, and must be numbered. For example, here are some suggested requirements statements for a typical GUI:

```
5.3.1  The GUI subsystem shall display a window for the main application.

5.3.2  The GUI subsystem shall display a window to provide details of operation (a help window).

5.3.3  The GUI subsystem shall react to mouse clicks on displayed buttons.

5.3.4  The GUI subsystem shall include a menu bar at the top of the main window.

5.3.5  The GUI subsystem shall provide the facility such that the operations which are available via graphical
           button clicks are also available via menu selections using the keyboard.

5.3.6  The GUI subsystem shall provide text entry fields into which the user may type values.

5.3.7  The GUI subsystem shall provide error checking on the text entry fields such that the user is
           provided immediate feedback in case of erroneous entry.
```
Notice the detail and specificity of each statement, which addresses a very particular operational requirement. It's not The GUI shall display a window, rather, it is The GUI shall display a window for the main application.

These are very simple examples. For a major software development effort, the SRS might be more than 100 pages long, with at least 1000 requirements statements. For your intermediate sized project, I would expect to see somewhere in the neighborhood of 100 requirements just in the functional section.


## Performance Requirements Section

This section should describe any performance requirements that exist for the completed system. Each subsection should reference a performance requirement, and should be given a meaningful name which describes the requirement. For example, if the first performance requirement is to perform a search of a database and return the first record with 10 seconds of clock time, then the first subsection might be labeled:

```
 5.4.1 First Search Results Returned in 10 Seconds
```
A brief description of the requirement (1-2 sentences, as needed) would follow. In this case, one might explain that once the user has finished entering a query at a client, it should take no more than 10 seconds of user clock time for the first result to be returned to the client from the server. One might also explain that the 10 second limit does not include the time required to sort results before displaying them to the user, or that there is no requirement for all results to be returned within the 10 second limit. Other performance requirements might specify that the overall design of the GUI must be intuitive, or use a minimum (specify how much) amount of disk space or memory.

## Environment Requirement Section

This section should list the software, hardware, and other resources needed for either the development or deployment or execution of the completed system. If any resource is unusual, provide a brief description of the resource, and a justification for using it. If a resource is not currently available, explain what steps will be taken to acquire it.

If there are separate requirements for development and deployment, use one subsection for each as shown in the outline above. Otherwise, list all environment requirements under the main heading for this section. The following is an example of an Environment Requirements section for a Computer Chess project from several years ago:

```
            Category          Requirement
        ----------------   -----------------
        Processor          Pentium II 266Mhz
        Hard Drive Space   10MB
        RAM                128MB
        Display            800x600, 256 colors
        Sound Card         Optional

    The exceptional RAM requirement is necessary to support the Geraldian
    algorithm for the Computer Player's game tree.  This algorithm requires
    a large amount of RAM.  There will be limited sound functionality unless
    the user has a sound card.

    Following are the software requirements for Computer Chess:

            Category          Requirement
        ----------------   -----------------
        Operating System   Windows NT
        Compiler           Microsoft Visual C++
        Graphics           Adobe Photoshop

    Windows NT is required for this project.  Because of the scope of the
    project, there will be no attempt to test the program under Windows 98.
    The program will be written in C++ using Microsoft Visual C++.  Adobe
    Photoshop will be used to produce the graphical images for the project.
```
>[!note]
> These will seem redundant with the environment stuff contained in the SDP, but the specifications listed in the SDP are preliminary, while these are intended to be finalized. Remember that the requirements process is iterative in nature, and you will probably re-visit this document at least once during the semester to ensure it accurately reflects the actual design. You will also be using the numbers of the various requirements statements to assemble your test document, and you will use it to help you start your design documents. You haven't seen the last of the SRS just because you turned it in!

## Table of Contents

Entries in the project SDL table of contents should be generated for the Requirements Specification document. These entries should match the section titles listed above and in the table of contents at the bottom of the Course Overview page.


## Sample Requirements Document

Dr. Johnson has an example of a document for [requirements specification](https://bjohnson.lmu.build/sampleproject/04_ReqSpec.doc) that you can check.

It is the requirements model for the TempConvApp project, in the sample project directory on the web site. This, as we have discussed in class, is an application that converts temperatures in a browser-based Java applet. Note that the document is much more detailed than the one you will need to execute for your project. However, pay special attention to section three of this sample, as it provides the specifics of HOW to write requirements. The main things to remember are:

- Only one requirement per "shall" statement
- Make the requirements "test-able"
- Number each requirement
- Use "will" and "should" for things that are NOT requirements to aid understanding