# Product Development

By Matthew Loe, Jonathan Wright, Andrew Li, Max Woodcock, Reuben Whibley

<p>&nbsp;</p>

## Contents

- [Introduction](#introduction)
- [List of Components](#list-of-componenets)
    - [APIs/Backend](#apis/backend)
    - [Frontend](#frontend)
- [Development](#development)
    - [Pre-Sprint 1](#pre-sprint-1)
    - [Sprint 1](#sprint-1)
    - [Sprint 2](#sprint-2)
    - [Sprint 3](#sprint-3)
    - [Sprint 4](#sprint-4)

<p>&nbsp;</p>

## Introduction

This document describes the development of the Study Planner product from the end of the first semester of 2021 for Curtin University (mid June) to the end of the second semester of 2021 for Curtin University (early November). The document is divided into sections following the agile development process used by the project team in the course of the development of the product. The presprint section is different from the other sections in that it describes development undertaken prior to the official start of the agile development of the product that occurs during sprint 1 (late July). Each sprint occurs over the course of approximately three weeks.

## List of Components

### APIs/Backend

- CareersAdminAPI
- CareersAPI
- CSVParser API
- UnitsAdminAPI
- UnitsAPI

<p>&nbsp;</p>

### Frontend

- CMS Frontend
- General Frontend - Bottom Up
- General Frontend - Top Down
- Information Pages
  - Career
  - Major
  - Specialization
  - Unit

<p>&nbsp;</p>

## Development

### Pre-Sprint 1

Development prior to sprint 1 occurred primarily in the month between the first and second semester of 2021 for Curtin University (mid June to late July). As development was not compulsory for project members, only a few members began development for the product. During this period the main components worked on were for the backend APIs the CareersAdminAPI and UnitsAdminAPI, and for the frontend the Content Management System and the General Frontend in which the product designs had begun to be implemented.

<p>&nbsp;</p>

### Sprint 1

In sprint 1, the main focus was on the backend APIs with the team focusing on and completing all the functionality of the APIs except for the CSVParser API, which was partially started, and the received data from the client was formatted into the desired CSV format. Work on the General Frontend was continued, and development of the BottomUp component for the General Frontend was begun.

<p>&nbsp;</p>

### Sprint 2

In sprint 2, the team focused primarily on the completion of the frontend components. The progress during this sprint somewhat stalled as the team encountered difficulties in using unfamiliar technologies to implement product designs, integrate components and communicate to the backend APIs. As such the time spent on the components exceeded the predicted estimated duration and the work for the main frontend components for the General Frontend and its BottomUp and TopDown components, did not reach the expected level of completion.

In spite of the complications, of the four information pages, three were started this sprint and the designs for the Career, Major and Unit information pages were completed, with the Major and Unit information pages having been further developed and were fully functional whilst the Career page was non-functional due to an inability to access the data via the API. It should be noted that the Unit information page was developed separately to the main General Frontend application and hence successful integration with the other components was not confirmed. Additionally routing for the General Frontend was successfully implemented, as were much of the product designs. Routing allowed the smooth integration of the General Frontend with the other front end components i.e. info pages, BottomUp and TopDown. However, due to the still immature nature of the latter two components, much of the applications desired funcitonality was still lacking.

Further complications in development came from the fact that any Http requests to the APIs apart from GET requests failed due to improperly implemented CORs by the APIs meaning that implementation of functionality relying on data from the backend was largely successful. Though development did continue by using mock data, the impact of the failed requests was limited as the main components, the BottomUp and TopDown components, were not yet at the stage where they needed or were highly dependent on the backend data to continue with development and testing. The main impact from this was the significant amount of time that was taken up in attempts to fix the problem by parts of the team as well as a halt in the completion of the Career information page component and the further development of the CMS Frontend, though the team member responsible for this component was also largely focusing on completing the CSV Parser API which was also blocking further development in the CMS.

As mentioned previously, the CSV Parser API was also continued during this sprint and was largely completed with it capable of parsing major, specialization and unit information with only the career part of the parser left to be implemented into the API.

<p>&nbsp;</p>

### Sprint 3

During the beginning of the sprint 3, work continued on the BottomUp, TopDown, CSV Parser API, CMS Frontend and the CORs problem of the APIs. As the CSV Parser was mostly completed already it was quickly finished and a successful solution to the CORs problem was found and applied to all affected APIs meaning that the previous uncompleted Career information page was finished as well. Additionally the last information page and the Specialization information page, was also completed and testing was conducted on the Career, Major and Specialization pages due to the API fixes and a refactor of the code to utilize React hooks.

The CMS Frontend was also completed during this sprint with testing being done and fixes added as needed for any errors. Performance monitoring of the component was also completed and the component was deployed into the public domain.

The Top Down and Bottom Up components had all their designs finalised with the client having confirmed their satisfaction with their appearance. Testing for the top down was written and testing for the Bottom Up was started, however both components still required time to complete the functionality.

<p>&nbsp;</p>

### Sprint 4

During this sprint, the Bottom Up and Top Down components were completed and the Unit Information component was integrated with the rest of the General Frontend. Testing for the bottom up component was completed and final unit and integration testing was completed for the Top Down and Unit Information components. The General Frontend was then deployed into the public domain.

Some minor appearance and design edits/updates were also made to the both the General and CMS Frontends to make them more appealing and to fix some minor mistakes.

The product was at this stage fully completed and was handed over to the client.