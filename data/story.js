/*
 * Portfolio content — the single source of truth for every evidence card,
 * the talks timeline, the open-source list and the press & posts feed.
 *
 * To add a post: copy any item below, give it a unique `id`, and set
 * `chapter` (prologue | ch1..ch5 | epilogue | null) and `featured`.
 * Items with status "needs-url" are hidden unless the page is opened with ?draft=1.
 * See CONTENT.md for the full field reference.
 */
window.STORY = {
  meta: {
    launchDate: "2026-11-17",
    scholar: "https://scholar.google.com/citations?user=Fvs_P1QAAAAJ&hl=en",
    linkedin: "https://www.linkedin.com/in/anil-kumar-mandal-9b2094140/",
    github: "https://github.com/mandalanil",
    chapterLinkedIn: "https://www.linkedin.com/showcase/asprs-floridaatlantic-chapter"
  },

  chapters: [
    { id: "prologue", metrics: [
      { value: "6", label: "peer-reviewed papers + 1 preprint" },
      { value: "59", label: "citations · h-index 4" },
      { value: "12+", label: "Florida communities planned for" },
      { value: "100+", label: "UAV mapping flights" }
    ]},
    { id: "ch1", metrics: [
      { value: "100+", label: "UAV flights" },
      { value: "50+", label: "communities visited" },
      { value: "6", label: "cereal crops modelled to 2100" },
      { value: "3", label: "countries: Nepal, Kenya, Eswatini" }
    ]},
    { id: "ch2", metrics: [
      { value: "1st", label: "place, FAU GIS Day 2023" },
      { value: "$10,000", label: "USGIF Maxar Scholarship — one student nationally" },
      { value: "Dec 2024", label: "MS conferred; PhD from Jan 2025" }
    ]},
    { id: "ch3", metrics: [
      { value: "≤0.5%", label: "difference from SFWMD Cascade 2001 worked examples" },
      { value: "R² 0.896", label: "across 20 basin–storm combinations" },
      { value: "9.1×", label: "GPU speed-up (100.9 → 11.1 min)" },
      { value: "48", label: "flood scenarios per region, >85% less manual work" }
    ]},
    { id: "ch4", metrics: [
      { value: "~100", label: "reached at World GIS Day 2025" },
      { value: "$850", label: "in prizes to 7 student researchers" },
      { value: "219", label: "LinkedIn followers" },
      { value: "~82 ha", label: "flood change mapped in Nepal, 11 search zones" }
    ]},
    { id: "ch5", metrics: [
      { value: "Nov 17", label: "2026 · public beta at GIS Mela" },
      { value: "4", label: "tools behind one login" },
      { value: "28", label: "built-in tutorials" },
      { value: "150+", label: "expected at the launch" }
    ]}
  ],

  items: [
    /* ───────────── Chapter 1 · Nepal & NAXA ───────────── */
    {
      id: "flyinglabs-landfill-2019", type: "news", date: "2019-01-30",
      title: "Using drones to estimate dumping-site volume in Kathmandu",
      source: "Flying Labs blog",
      url: "https://flyinglabs.org/blog/nepal-flying-labs-using-drones-to-estimate-dumping-sites-volume-in-kathmandu/",
      summary: "One of the early Nepal Flying Labs / NAXA drone surveys from the period I joined the team — UAV photogrammetry turned into volume estimates for city planners.",
      role: "NAXA team (project context)", chapter: "ch1", featured: false, tags: ["UAV", "context"], status: "verified"
    },
    {
      id: "flyinglabs-covid-2020", type: "news", date: "2020-08-10",
      title: "High-resolution aerial mapping of Nepal's urban centres aids planning during COVID-19",
      source: "Flying Labs blog",
      url: "https://flyinglabs.org/blog/high-resolution-aerial-mapping-of-nepals-urban-centers-aids-urban-planning-during-covid-19/",
      summary: "Urban drone mapping the NAXA / Nepal Flying Labs team kept flying through the pandemic.",
      role: "NAXA team (project context)", chapter: "ch1", featured: false, tags: ["UAV", "context"], status: "verified"
    },
    {
      id: "iom-open-spaces-2020", type: "document", date: "2020-12-14",
      title: "Identification and GIS mapping of open spaces for humanitarian purposes",
      source: "IOM Nepal",
      url: "https://nepal.iom.int/resources/open-spaces-humanitarian-purposes-bhimeshwor-municipality",
      summary: "Five municipal reports for the International Organization for Migration. Each credits me as the team's Photogrammetry and Remote Sensing Officer: drone-mapped open spaces that emergency responders can use after an earthquake.",
      role: "Photogrammetry & Remote Sensing Officer (credited)", chapter: "ch1", featured: true, tags: ["UAV", "humanitarian", "report"], status: "verified",
      links: [
        { label: "Bhimeshwor", url: "https://nepal.iom.int/resources/open-spaces-humanitarian-purposes-bhimeshwor-municipality" },
        { label: "Gorkha", url: "https://nepal.iom.int/sites/g/files/tmzbdl1116/files/documents/OpenSpacesReport_of_Gorkha.pdf" },
        { label: "Gosainkunda", url: "https://nepal.iom.int/sites/g/files/tmzbdl1116/files/documents/OpenSpacesReport_of_GosaikundaRuralMunicipality.pdf" },
        { label: "Neelakantha", url: "https://nepal.iom.int/sites/g/files/tmzbdl1116/files/documents/OpenSpacesReport_of_Neelakantha.pdf" },
        { label: "Chautara Sangachowkgadhi", url: "https://nepal.iom.int/sites/g/files/tmzbdl1116/files/documents/OpenSpacesReport_of_ChauataraSangachowkgadi.pdf" }
      ]
    },
    {
      id: "wefly-2020", type: "news", date: "2020-12-11",
      title: "Nepal Flying Labs, NAXA and WeRobotics launch the WeFly UAV registration portal",
      source: "Unmanned Airspace",
      url: "https://www.unmannedairspace.info/latest-news-and-information/nepal-flying-labs-naxa-and-werobotics-launch-prototype-uav-registration-platform-wefly-portal/",
      summary: "NAXA's work to make drone flight permissions in Nepal digital — the regulatory side of the flying I was doing.",
      role: "NAXA (project context)", chapter: "ch1", featured: false, tags: ["UAV", "context"], status: "verified"
    },
    {
      id: "naxa-dissemination-2020", type: "news", date: "2020-12-21",
      title: "Official dissemination of humanitarian open-space mapping",
      source: "NAXA",
      url: "https://naxa.com.np/event/26",
      summary: "NAXA presented the IOM open-space maps to government and humanitarian partners in Kathmandu.",
      role: "NAXA team (project context)", chapter: "ch1", featured: false, tags: ["event", "context"], status: "verified"
    },
    {
      id: "leprosy-review-2022", type: "paper", date: "2022-12-01",
      title: "Trends and geographical variation in leprosy case detection and disability in Nepal, 2010–2021",
      source: "Leprosy Review", venue: "Leprosy Review 93(4), 348–363",
      url: "https://leprosyreview.org/article/93/4/20-22071", doi: "10.47276/lr.93.4.348",
      authors: "Taal, A.T., … Kumar, A., … (2022)", leadAuthor: false,
      summary: "Ward-level spatial analysis of leprosy clustering across Nepal — public-health GIS.",
      chapter: "ch1", featured: false, tags: ["paper", "health GIS"], status: "verified"
    },
    {
      id: "rec-2023", type: "paper", date: "2023-03-14",
      title: "Climate change–driven agricultural frontiers and their ecosystem trade-offs in the hills of Nepal",
      source: "Regional Environmental Change", venue: "Regional Environmental Change 23(2), 50",
      url: "https://doi.org/10.1007/s10113-023-02043-0", doi: "10.1007/s10113-023-02043-0",
      authors: "KC, K.B., Tzadok, E., Mandal, A.K. (2023)", leadAuthor: false,
      summary: "Where six cereal crops could newly be grown by 2041–2060 and 2081–2100, and what that would cost in carbon, forest and protected land. I built the suitability modelling at NAXA.",
      chapter: "ch1", featured: true, tags: ["paper", "climate", "agriculture"], status: "verified"
    },
    {
      id: "naxa-linkedin-2023", type: "linkedin", date: "2023-03",
      title: "NAXA congratulates its Technical Lead – GIS and Remote Sensing on the publication",
      source: "NAXA on LinkedIn", url: "https://np.linkedin.com/company/naxanp", embedUrl: null,
      summary: "NAXA's post on the Regional Environmental Change paper.",
      chapter: "ch1", featured: true, tags: ["post"], status: "needs-url"
    },
    {
      id: "sustainability-2023", type: "paper", date: "2023-06-09",
      title: "Multi-level participatory GIS framework to assess mobility needs and transport barriers in rural areas: Mumias East, Kakamega, Kenya",
      source: "Sustainability", venue: "Sustainability 15(12), 9344",
      url: "https://doi.org/10.3390/su15129344", doi: "10.3390/su15129344",
      authors: "Munyaka, J.C.B., Chenal, J., de Roulet, P., Mandal, A.K., Pudasaini, U., Otieno, N.O. (2023)", leadAuthor: false,
      summary: "A participatory GIS method for finding where rural people can't get to markets, schools and clinics — tested in western Kenya.",
      chapter: "ch1", featured: true, tags: ["paper", "PGIS", "mobility"], status: "verified"
    },
    {
      id: "fig-2023", type: "talk", date: "2023-10-02",
      title: "Usafiri: an open-source GIS-based participatory mapping tool to assist transport need assessment in rural communities",
      source: "FIG Commission 7 & 2 Annual Meeting, Deventer (NL)",
      url: "https://fig.net/resources/proceedings/fig_proceedings/7_2023/papers/se06/SE06_oli_pudasaini_et_al_12353_abs.pdf",
      authors: "Oli, U., Pudasaini, U., Tandukar, N., Mandal, A.",
      summary: "The open-source tool behind our rural-mobility fieldwork, presented to the International Federation of Surveyors.",
      chapter: "ch1", featured: false, tags: ["talk", "PGIS"], status: "verified"
    },
    {
      id: "sustainability-2024-eswatini", type: "paper", date: "2024-01-02",
      title: "Geospatial tools and remote sensing strategies for timely humanitarian response: drought monitoring in Eswatini",
      source: "Sustainability", venue: "Sustainability 16(1), 409",
      url: "https://doi.org/10.3390/su16010409", doi: "10.3390/su16010409",
      authors: "Munyaka, J.C.B., Chenal, J., Mabaso, S., Tfwala, S.S., Mandal, A.K. (2024)", leadAuthor: false,
      summary: "Thirty years of vegetation-health data turned into a drought early-warning picture for Eswatini. Featured in NASA's Lifelines gallery.",
      chapter: "ch1", featured: true, tags: ["paper", "drought", "humanitarian"], status: "verified",
      links: [{ label: "NASA Lifelines", url: "https://nasalifelines.org/lifelines-gallery/geospatial-tools-and-remote-sensing-strategies-for-timely-humanitarian-response-a-case-study-on-drought-monitoring-in-eswatini/" }]
    },
    {
      id: "wbr-toolkit-2024", type: "document", date: "2024-04",
      title: "Using spatial data to understand rural mobility — a step-by-step toolkit",
      source: "World Bicycle Relief · EPFL Tech4Dev · Nepal Flying Labs",
      url: "https://infoscience.epfl.ch/server/api/core/bitstreams/54081cf1-dea6-498a-94e7-f636e95d9361/content",
      summary: "The field method from our Kenya and Nepal work, published as a practitioner toolkit; I'm credited on the PGIS team.",
      role: "PGIS team (credited)", chapter: "ch1", featured: true, tags: ["toolkit", "PGIS"], status: "verified",
      links: [{ label: "EPFL project page", url: "https://www.epfl.ch/labs/ceat/en/tech4dev-participatory-gis-and-rural-mobility-2/" },
              { label: "Acknowledged in Sustainability 16(21) 9442", url: "https://www.mdpi.com/2071-1050/16/21/9442" }]
    },
    {
      id: "epfl-video-2024", type: "youtube", date: "2024-05-07",
      title: "EPFL Tech4Dev × World Bicycle Relief — a participatory GIS toolkit for rural mobility",
      source: "EPFL on YouTube", url: "https://www.youtube.com/watch?v=S3dnFTKwnKM",
      embedUrl: "https://www.youtube-nocookie.com/embed/S3dnFTKwnKM", videoId: "S3dnFTKwnKM",
      summary: "EPFL's video on the toolkit our Nepal Flying Labs team helped build and field-test.",
      chapter: "ch1", featured: true, tags: ["video", "PGIS"], status: "verified"
    },

    /* ───────────── Chapter 2 · A new coast ───────────── */
    {
      id: "fau-gisday-2023", type: "news", date: "2023-11-16",
      title: "CEGE students won the Student Presentation Competition on GIS Day at FAU",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2311-gisdayaward/",
      summary: "Three months after arriving, I took first place with a participatory-GIS plan for sustainable urban mobility in Birendranagar, Surkhet — work I had carried from Nepal.",
      role: "1st place", chapter: "ch2", featured: true, tags: ["award", "GIS Day"], status: "verified"
    },
    {
      id: "usgif-maxar-2024", type: "news", date: "2024-08-21",
      title: "Anil Kumar Mandal receives the 2024 USGIF Maxar Scholarship for Diversity and Innovation in GEOINT",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2024-07-anil-usgif/",
      image: "images/story/press/2024-08-usgif.webp", imageCredit: "Photo: FAU CEGE",
      summary: "A $10,000 award given to one student in the US, for an essay on fusing UAV imagery and LiDAR to reconstruct cities in 3D. It came with a poster at the 2025 GEOINT Symposium in St. Louis.",
      role: "Scholarship recipient", chapter: "ch2", featured: true, tags: ["award", "GEOINT"], status: "verified",
      links: [
        { label: "USGIF announcement", url: "https://usgif.org/recognizing-excellence-2024-usgif-sponsored-scholarship-recipients/" },
        { label: "USGIF awardee profile", url: "https://usgif.org/scholarships/2024-usgif-scholarship-awardees/" },
        { label: "LIDAR Magazine", url: "https://lidarmag.com/2024/08/06/recognizing-excellence-2024-usgif-sponsored-scholarship-recipients/" },
        { label: "Geo Week News", url: "https://www.geoweeknews.com/articles/usgif-2024-scholarship-recipients-winners-geoint-geospatial-intelligence/" }
      ]
    },
    {
      id: "usgif-release-2024", type: "news", date: "2024-08-05",
      title: "Recognizing excellence: 2024 USGIF sponsored scholarship recipients",
      source: "USGIF", url: "https://usgif.org/recognizing-excellence-2024-usgif-sponsored-scholarship-recipients/",
      summary: "USGIF's national announcement, syndicated by LIDAR Magazine and Geo Week News.",
      chapter: null, featured: false, tags: ["award"], status: "verified"
    },
    {
      id: "fau-gisexpo-2024", type: "news", date: "2024-08-30",
      title: "FAU faculty and students make a strong showing at South Florida GIS Expo 2024",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2408-gisexpo",
      image: "images/story/press/2024-08-gisexpo.webp", imageCredit: "Photo: FAU CEGE",
      summary: "Presenting a long-term analysis of climate trends and vegetation dynamics across Florida — the start of what became a 43-year study.",
      role: "Presenter", talkTitle: "Long-term analysis of climate trends and vegetation dynamics in Florida", talkSource: "South Florida GIS Expo 2024", chapter: "ch2", featured: true, tags: ["talk", "climate"], status: "verified"
    },

    /* ───────────── Chapter 3 · CWR³ flood modelling ───────────── */
    {
      id: "natural-hazards-2025", type: "paper", date: "2025-05-28",
      title: "Semi-automated workflow for multi-basin, multi-scenario flood risk modeling, mapping, and impact assessment",
      source: "Natural Hazards", venue: "Natural Hazards 121(12), 14425–14441",
      url: "https://doi.org/10.1007/s11069-025-07361-6", doi: "10.1007/s11069-025-07361-6",
      authors: "Mandal, A.K., Thapa Chhetri, M., Bloetscher, F., Yong, Y., Su, H. (2025)", leadAuthor: true,
      summary: "The workflow behind our watershed master plans: 48 rainfall, sea-level-rise and tide scenarios per region, with more than 85% less manual processing.",
      chapter: "ch3", featured: true, tags: ["paper", "flood risk"], status: "verified",
      links: [{ label: "Code on GitHub", url: "https://github.com/mandalanil/Semi-Automated-workflow-for-flood-risk-mapping" }]
    },
    {
      id: "fau-natural-hazards-news-2025", type: "news", date: "2025-06-12",
      title: "New research boosts flood risk planning with smarter mapping tools",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2506-wateshedmodeling-publication/",
      summary: "FAU's write-up of the Natural Hazards paper.",
      chapter: "ch3", featured: true, tags: ["news", "flood risk"], status: "verified"
    },
    {
      id: "fau-gisexpo-2025", type: "news", date: "2025-08-22",
      title: "FAU geomatics engineering faculty and students participate in 2025 South Florida GIS Expo",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2508-gisexpo",
      image: "images/story/press/2025-08-gisexpo.webp", imageCredit: "Photo: FAU CEGE",
      summary: "Presenting PyWMP-Pro, our Python extension that brings scalable flood-risk mapping into ArcGIS Pro.",
      role: "Presenter", talkTitle: "PyWMP-Pro: a scalable Python extension for flood risk mapping in ArcGIS Pro", talkSource: "South Florida GIS Expo 2025", chapter: "ch3", featured: true, tags: ["talk", "PyWMP"], status: "verified"
    },
    {
      id: "awra-agenda-2025", type: "talk", date: "2025-10-03",
      title: "PyWMP: an open-source framework for watershed modeling and planning",
      source: "AWRA Florida technical meeting, SFWMD headquarters",
      url: "https://awraflorida.org/event-6286731",
      authors: "Thapa, A.K., Mandal, A.K.",
      summary: "Invited talk to Florida's water-resources professionals at the South Florida Water Management District.",
      chapter: null, featured: false, tags: ["talk", "PyWMP"], status: "verified"
    },
    {
      id: "fau-awra-2025", type: "news", date: "2025-10-04",
      title: "FAU graduate students showcase flood-modeling innovation at AWRA Florida meeting",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2510-anilajayawra/",
      image: "images/story/press/2025-10-awra.webp", imageCredit: "Photo: FAU CEGE",
      summary: "Ajay Kumar Thapa and I presented PyWMP at the South Florida Water Management District: an open-source Python platform from CWR³ that supports National Flood Insurance Program work, with AI-driven calibration in development.",
      role: "Co-presenter", chapter: "ch3", featured: true, tags: ["news", "PyWMP"], status: "verified",
      links: [{ label: "AWRA Florida agenda", url: "https://awraflorida.org/event-6286731" }]
    },
    {
      id: "pywmp-docs", type: "product", date: "2026-06",
      title: "PyWMP — Python Watershed Modeling Platform",
      source: "CWR³ · Florida Atlantic University",
      url: "https://dbishal13.github.io/pywmp_documentation/",
      summary: "The engine I lead: HEC-HMS methods and Cascade 2001 routing in one Python framework, with 1D, 2D rain-on-mesh and hybrid tiers that run on CPU or GPU, plus built-in access to public elevation, rainfall, land-cover, soil and gauge data.",
      role: "Lead architect", chapter: "ch3", featured: true, tags: ["product", "PyWMP", "open source"], status: "verified"
    },
    {
      id: "fau-thesis-375", type: "document", date: "2026-08",
      title: "Comparative performance evaluation of a GPU-accelerated watershed model for flood inundation mapping",
      source: "FAU Digital Commons (MS thesis, M. Ali)",
      url: "https://digitalcommons.fau.edu/etd_general/375/",
      summary: "An independent MS thesis benchmarking PyWMP's 2D rain-on-mesh solver against HEC-RAS 2D and Flood Modeller.",
      role: "Software under evaluation", chapter: "ch3", featured: true, tags: ["validation", "PyWMP"], status: "verified",
      links: [{ label: "Related thesis: replicating an extreme South Florida rainfall event", url: "https://digitalcommons.fau.edu/etd_general/374/" }]
    },
    {
      id: "fau-gisexpo-2026", type: "news", date: "2026-08-27",
      title: "FAU faculty and graduate students participate in the 2026 South Florida GIS Expo",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2026-08-gisexpo/",
      image: "images/story/press/2026-08-gisexpo.webp", imageCredit: "Photo: FAU CEGE",
      summary: "Oral presentation of PyWMP-WEB, which puts geospatial data and watershed modelling in the browser. Three ASPRS FAU chapter members also presented.",
      role: "Oral presenter", talkTitle: "PyWMP-WEB: integrating geospatial intelligence and web technologies for modern watershed management", talkSource: "South Florida GIS Expo 2026, West Palm Beach", chapter: "ch3", featured: true, tags: ["talk", "PyWMP"], status: "verified"
    },

    /* ───────────── Chapter 4 · ASPRS FAU ───────────── */
    {
      id: "flasprs-meet-2025", type: "talk", date: "2025-09-05",
      title: "FL-ASPRS student chapter meet & greet",
      source: "ASPRS Florida Region", url: "https://my.asprs.org/FLCHAPTER25",
      summary: "FAU joined five other Florida chapters at the region's first joint student event.",
      chapter: "ch4", featured: false, tags: ["ASPRS", "event"], status: "verified"
    },
    {
      id: "gisday-2025-linkedin", type: "linkedin", date: "2025-11-17",
      title: "World GIS Day 2025 at FAU — recap",
      source: "ASPRS FAU on LinkedIn", url: "https://www.linkedin.com/showcase/asprs-floridaatlantic-chapter", embedUrl: null,
      summary: "The chapter's own recap of World GIS Day 2025.",
      chapter: "ch4", featured: true, tags: ["post", "GIS Day"], status: "needs-url"
    },
    {
      id: "fwea-recap-2026", type: "news", date: "2026-03-12",
      title: "FWEA student chapter Fall 2025 semester recap — joint World GIS Day",
      source: "FAU College of Engineering & Computer Science",
      url: "https://www.fau.edu/engineering/cege/news/2603-fwea-fall-2025-recap",
      image: "images/story/press/2026-03-fwea-gisday.webp", imageCredit: "Photo: FAU CEGE",
      summary: "FAU's account of the World GIS Day we co-hosted with the FWEA and FSMS student chapters on November 17, 2025.",
      chapter: "ch4", featured: true, tags: ["news", "GIS Day"], status: "verified"
    },
    {
      id: "expo-2026-linkedin", type: "linkedin", date: "2026-08-21",
      title: "Chapter talks at South Florida GIS Expo 2026",
      source: "ASPRS FAU on LinkedIn", url: "https://www.linkedin.com/showcase/asprs-floridaatlantic-chapter", embedUrl: null,
      summary: "Crop mapping in the Navajo Nation, Sentinel-1 SAR flood mapping of Fort Lauderdale, and PyWMP-WEB.",
      chapter: "ch4", featured: true, tags: ["post", "GIS Expo"], status: "needs-url"
    },
    {
      id: "nepal-flood-linkedin", type: "linkedin", date: "2026-09",
      title: "Nepal flash flood rapid assessment — Bhote Koshi / Trishuli corridor",
      source: "ASPRS FAU on LinkedIn", url: "https://www.linkedin.com/showcase/asprs-floridaatlantic-chapter", embedUrl: null,
      summary: "The chapter's public release of the rapid assessment and its free GIS layers.",
      chapter: "ch4", featured: true, tags: ["post", "disaster response"], status: "needs-url"
    },
    {
      id: "board-2026-linkedin", type: "linkedin", date: "2026-09",
      title: "ASPRS FAU 2026–27 officer board",
      source: "ASPRS FAU on LinkedIn", url: "https://www.linkedin.com/showcase/asprs-floridaatlantic-chapter", embedUrl: null,
      image: "images/story/events/2026-09-board.webp",
      summary: "Re-elected president alongside a six-person board. Chapter motto: \"Shaping Tomorrow Through Mapping Today.\"",
      chapter: "ch4", featured: true, tags: ["post", "ASPRS"], status: "needs-url"
    },
    {
      id: "fair-2026-linkedin", type: "linkedin", date: "2026-09-20",
      title: "Campus student-organization fair",
      source: "ASPRS FAU on LinkedIn", url: "https://www.linkedin.com/showcase/asprs-floridaatlantic-chapter", embedUrl: null,
      summary: "Hands-on laser scanners, drones and multispectral sensors for new students.",
      chapter: "ch4", featured: false, tags: ["post", "outreach"], status: "needs-url"
    },
    {
      id: "jisrs-2026", type: "paper", date: "2026-07-17",
      title: "Improving flood detection in the Himalayas: evaluating SAR–optical data fusion with machine learning in a mountainous river basin of Nepal",
      source: "Journal of the Indian Society of Remote Sensing", venue: "J. Indian Soc. Remote Sens. 54(10), 3917–3930",
      url: "https://doi.org/10.1007/s12524-026-02484-0", doi: "10.1007/s12524-026-02484-0",
      authors: "Rijal, S., et al., Mandal, A.K., Parajuli, R. (2026)", leadAuthor: false,
      summary: "Random-forest fusion of Sentinel-1 radar and Sentinel-2 optical imagery for the Melamchi floods (88% overall accuracy) — the method behind the FloodFusion app.",
      chapter: "ch4", featured: true, tags: ["paper", "SAR", "flood"], status: "verified",
      links: [{ label: "FloodFusion app (Earth Engine)", url: "https://ee-kanil2310.projects.earthengine.app/view/flood-mapping" }]
    },

    /* ───────────── Chapter 5 · CWR³Data ───────────── */
    {
      id: "cwr3data-product", type: "product", date: "2026-09-21",
      title: "CWR³Data — data portal and watershed modelling workbench",
      source: "Center for Water Resiliency & Risk Reduction, FAU",
      url: "https://cwr3data.fau.edu",
      image: "images/story/figures/ch5-cwr3data.webp", imageCredit: "Screenshot: CWR³Data",
      summary: "The digital platform of FAU's Center for Water Resiliency & Risk Reduction, with a geospatial data portal and a hydrological modelling workbench in one browser tab. I am its developer.",
      role: "Developer", chapter: "ch5", featured: true, tags: ["product", "CWR³Data"], status: "verified"
    },
    {
      id: "gismela-2026-linkedin", type: "linkedin", date: "2026-09-29",
      title: "GIS MELA 2026 | World GIS Day at FAU",
      source: "ASPRS FAU on LinkedIn",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7510477198013820928/",
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7510477198013820928",
      embedHeight: 640,
      image: "images/story/events/2026-11-gismela.webp",
      summary: "November 17, 2026, 9 AM–3 PM, FAU Student Union: student research, posters, GeoAI, UAV-LiDAR, rainfall-runoff simulations — and the public beta of CWR³Data.",
      chapter: "ch5", featured: true, tags: ["post", "GIS Mela", "CWR³Data"], status: "verified"
    },
    {
      id: "cwr3data-poster-2026", type: "document", date: "2026-09",
      title: "CWR³Data poster — \"Discover the data, model the water, deliver the result\"",
      source: "CWR³ · FAU", url: "assets/docs/CWR3Data_poster.pdf",
      image: "images/story/figures/ch5-poster.webp",
      summary: "The A1 poster introducing the platform's four tools.",
      chapter: "ch5", featured: true, tags: ["poster", "CWR³Data"], status: "verified"
    },

    /* ───────────── Epilogue · open threads ───────────── */
    {
      id: "ssrn-deri-2026", type: "paper", date: "2026-08-29",
      title: "Mapping digital election readiness in Nepal: a municipal-level composite index, spatial autocorrelation analysis, and evidence-based e-voting policy framework",
      source: "SSRN (preprint)", venue: "SSRN preprint",
      url: "https://doi.org/10.2139/ssrn.7364879", doi: "10.2139/ssrn.7364879",
      authors: "Mandal, A., Sharma, A., Bastola, D., Thapa, A., Su, H., Yong, Y., Bloetscher, F. (2026)", leadAuthor: true,
      summary: "A readiness index for all 753 local units in Nepal, mapped and tested for spatial clustering — GIS applied to democratic infrastructure.",
      chapter: "epilogue", featured: true, tags: ["preprint", "policy"], status: "verified"
    },

    /* ───────────── Talks without a public page (timeline only) ───────────── */
    { id: "talk-pecs-2024", type: "talk", date: "2024-08", title: "Climate change–driven agricultural frontiers in the hills of Nepal", source: "PECS-3: Pathways to Sustainability, Montréal", url: "https://mountainresearchinitiative.org/events/pecs-3-pathways-to-sustainability-2024/", chapter: null, featured: false, tags: ["talk"], status: "verified" },
    { id: "talk-geoint-2025", type: "talk", date: "2025-05", title: "Poster: advancing GEOINT through 3D city reconstruction", source: "GEOINT 2025 Symposium (GEOINT Foreword), St. Louis", url: null, chapter: null, featured: false, tags: ["talk", "poster"], status: "verified" },
    { id: "talk-ufasprs-2025", type: "talk", date: "2025-11-06", title: "PyWMP", source: "UF / FL-ASPRS Fall 2025 GeoSpatial Workshop", url: null, chapter: null, featured: false, tags: ["talk"], status: "verified" },
    { id: "talk-geoweek-2026", type: "talk", date: "2026-02", title: "Event-based spatio-temporal graph convolutional networks for rainfall–runoff prediction in HUC12 watersheds", source: "Geo Week 2026", url: "https://github.com/mandalanil/ESTGCN", chapter: null, featured: false, tags: ["talk"], status: "verified" }
  ],

  code: [
    { name: "ESTGCN", url: "https://github.com/mandalanil/ESTGCN", image: "images/story/code/estgcn.webp",
      blurb: "Graph neural networks for rainfall–runoff prediction across five nested HUC12 basins in the Kissimmee–Okeechobee system. Hydrologic-topology graphs against proximity graphs, 72 reproducible scenarios.",
      tags: ["Python", "Keras / TensorFlow", "Hydrology"] },
    { name: "Florida climate–vegetation analysis", url: "https://github.com/mandalanil/ClimateChange", image: "images/story/code/climatechange.webp",
      blurb: "43 years (1982–2024) of NDVI, temperature and precipitation across Florida: Theil–Sen trends, EOF decomposition and spatial regression, with a fully reproducible notebook.",
      tags: ["Python", "Remote sensing", "Spatial statistics"] },
    { name: "Semi-automated flood risk mapping", url: "https://github.com/mandalanil/Semi-Automated-workflow-for-flood-risk-mapping", icon: "flood",
      blurb: "The ArcPy notebooks behind the Natural Hazards paper: HUC subsetting, ArcHydro, soil storage, Cascade 2001 inputs, z-score flood maps and infrastructure risk scoring.",
      tags: ["ArcPy", "LiDAR DEM", "Flood risk"] },
    { name: "FloodFusion", url: "https://github.com/mandalanil/FloodFusion", live: "https://ee-kanil2310.projects.earthengine.app/view/flood-mapping", liveLabel: "Live app", icon: "satellite",
      blurb: "An Earth Engine app that fuses Sentinel-1 SAR and Sentinel-2 imagery with a random forest to map floods, with no coding needed.",
      tags: ["Earth Engine", "SAR", "Random forest"] },
    { name: "GeoAI roadmap for Nepal", url: "https://github.com/mandalanil/GeoAI_roadmap4Nepal", live: "https://mandalanil.github.io/GeoAI_roadmap4Nepal/", liveLabel: "Live report", icon: "route",
      blurb: "An interactive policy report on how GeoAI could serve Nepal: goals, digital landscape, an invest-to-reinvest model, a SWOT analysis and a phased roadmap.",
      tags: ["GeoAI", "Policy"] },
    { name: "PyWMP documentation", url: "https://dbishal13.github.io/pywmp_documentation/", icon: "water",
      blurb: "Public documentation for the PyWMP engine (v0.2.0) that I lead at CWR³.",
      tags: ["Docs", "Hydrology"] }
  ]
};
