/* =======================================================================
   assets/js/data.js
   -----------------------------------------------------------------------
   This is the ONLY file you need to edit to add/change rooms.
   Each key inside "scenes" is one 360° location.

   panorama : path to the FULL-SIZE 360 photo  -> assets/images/
   thumb    : path to a SMALL preview photo    -> assets/thumbs/
   hotSpots : the clickable pins inside the photo
        type: "scene"  -> jumps to another room  (needs sceneId)
        type: "info"   -> shows a text bubble    (needs text only)
        pitch: up/down position   (-90 to 90)
        yaw:   left/right position (-180 to 180)

   Tip for finding pitch/yaw numbers: open the tour, look around to the
   spot where you want the pin, open browser console (F12) and type
   tourViewer.getPitch()  and  tourViewer.getYaw()  to read the current
   values, then plug them in below.
   ======================================================================= */

const TOUR_CONFIG = {
  default: {
    firstScene: "campus_aerial",
    author: "Karunya University",
    sceneFadeDuration: 800,
    autoLoad: true,
    compass: true,
    hfov: 110
  },
  scenes: {
    campus_aerial: {
      title: "Campus Overview",

      icon: "🛰️",

      description: "Explore Karunya Institute from the aerial view.",
      mapX: 22,
      mapY: 80,

      thumb: "assets/thumbs/room1.jpg",

      panorama: "assets/images/room1.jpg",

      // persistent hotspots for campus aerial view
      hotSpots: [
        {
          id: "hot_1786944277453",
          pitch: -9.848429924222446,
          yaw: 2.864989281653493,
          type: "scene",
          text: "Main Block",
          sceneId: "central_library",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "Main Block", icon: "assets/icons/location-mark.png" }
        },
        {
          id: "hot_1786944465810",
          pitch: -2.76638460960175,
          yaw: 19.49733997260023,
          type: "scene",
          text: "Computer Technology and Science",
          sceneId: "Computer Technology and Science",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "Computer Technology and Science", icon: "assets/icons/location-mark.png" }
        },
        {
          id: "hot_1786944526907",
          pitch: -7.2475172817484115,
          yaw: 55.71836352055004,
          type: "scene",
          text: "Electronics and Communication Engineering",
          sceneId: "Electronics and Communication Engineering",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "Electronics and Communication Engineering", icon: "assets/icons/location-mark.png" }
        },
        {
          id: "hot_1786944603218",
          pitch: -13.683236263389723,
          yaw: 40.72914962414768,
          type: "scene",
          text: "Computer Science and Engineering",
          sceneId: "Computer Science and Engineering",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "Computer Science and Engineering", icon: "assets/icons/location-mark.png" }
        },
        {
          id: "hot_1786944628082",
          pitch: -3.790200485285938,
          yaw: 12.367802652508999,
          type: "scene",
          text: "Karunya Media Centre",
          sceneId: "Karunya Media Centre",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "Karunya Media Centre", icon: "assets/icons/location-mark.png" }
        },
        {
          id: "hot_1786944725108",
          pitch: -3.7101887770307114,
          yaw: 85.08509800721333,
          type: "scene",
          text: "El-Shaddai Auditorium",
          sceneId: "El-Shaddai Auditorium",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "El-Shaddai Auditorium", icon: "assets/icons/location-mark.png" }
        },
        {
          id: "hot_1786944771043",
          pitch: -2.1290956728592496,
          yaw: -147.50454575447134,
          type: "scene",
          text: "DGS Auditorium",
          sceneId: "DGS Auditorium",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "DGS Auditorium", icon: "assets/icons/location-mark.png" }
        },
        {
          id: "hot_1786948393712",
          pitch: -3.7699067357853107,
          yaw: -19.009589226988282,
          type: "scene",
          text: "Elohim Auditorium",
          sceneId: "Elohim Auditorium",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "Elohim Auditorium", icon: "assets/icons/location-mark.png" }
        },
      ]
    },
    administration: {
      title: "Administration",

      category: "Administration",

      icon: "🏢",

      description: "Administrative Block",

      mapX: 38,
      mapY: 58,

      thumb: "assets/thumbs/room2.jpg",

      panorama: "assets/images/room2.jpg",

      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          text: "Main Entrance",
          sceneId: "campus_aerial"
        },
        {
          pitch: -3,
          yaw: 180,
          type: "scene",
          text: "Central Library",
          sceneId: "central_library"
        }
      ]
    },
    central_library: {
      title: "Central Library",

      category: "Library",

      icon: "📚",

      description: "Central Library",

      mapX: 62,
      mapY: 42,

      thumb: "assets/thumbs/room3.jpg",

      panorama: "assets/images/room3.jpg",

      hotSpots: [
        {
          pitch: 0,
          yaw: 180,
          type: "scene",
          text: "Administration",
          sceneId: "administration"
        },
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          text: "Campus Overview",
          sceneId: "campus_aerial"
        }
      ]
    }
    ,
    /* --- Additional placeholder scenes (replace panoramas/thumbs later) --- */
    administrative_block: {
      title: "Administrative Block",
      category: "Administration",
      icon: "🏛️",
      description: "Administrative Block",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    civil_engineering: {
      title: "Civil Engineering",
      category: "Engineering & Technology",
      icon: "🏗️",
      description: "Civil Engineering Department",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    eee: {
      title: "EEE",
      category: "Engineering & Technology",
      icon: "🔌",
      description: "Electrical & Electronics Engineering",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    ece: {
      title: "ECE",
      category: "Engineering & Technology",
      icon: "📡",
      description: "Electronics & Communication Engineering",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    robotics: {
      title: "Robotics",
      category: "Engineering & Technology",
      icon: "🤖",
      description: "Robotics Lab",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    mechanical_engineering: {
      title: "Mechanical",
      category: "Engineering & Technology",
      icon: "⚙️",
      description: "Mechanical Engineering",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    aerospace_engineering: {
      title: "Aerospace",
      category: "Engineering & Technology",
      icon: "✈️",
      description: "Aerospace Engineering",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    biomedical_engineering: {
      title: "Biomedical",
      category: "Engineering & Technology",
      icon: "🧬",
      description: "Biomedical Engineering",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    biotechnology: {
      title: "Biotechnology",
      category: "Engineering & Technology",
      icon: "🧪",
      description: "Biotechnology",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    food_processing: {
      title: "Food Processing",
      category: "Engineering & Technology",
      icon: "🍽️",
      description: "Food Processing",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    cse: {
      title: "CSE",
      category: "Computer Science & Technology",
      icon: "💻",
      description: "Computer Science & Engineering",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    data_science_cyber_security: {
      title: "Data Science & Cyber Security",
      category: "Computer Science & Technology",
      icon: "🔐",
      description: "Data Science and Cyber Security",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    ai_machine_learning: {
      title: "AI & Machine Learning",
      category: "Computer Science & Technology",
      icon: "🧠",
      description: "AI & Machine Learning",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    applied_chemistry: {
      title: "Applied Chemistry",
      category: "Arts & Science",
      icon: "⚗️",
      description: "Applied Chemistry",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    applied_physics: {
      title: "Applied Physics",
      category: "Arts & Science",
      icon: "🔭",
      description: "Applied Physics",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    nano_sciences: {
      title: "Nano Sciences",
      category: "Arts & Science",
      icon: "🔬",
      description: "Nano Sciences",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    digital_sciences: {
      title: "Digital Sciences",
      category: "Arts & Science",
      icon: "🖥️",
      description: "Digital Sciences",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    commerce_international_trade: {
      title: "Commerce & International Trade",
      category: "Arts & Science",
      icon: "💼",
      description: "Commerce & International Trade",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    criminology_forensic_science: {
      title: "Criminology & Forensic Science",
      category: "Arts & Science",
      icon: "🕵️",
      description: "Criminology & Forensic Science",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    management_studies: {
      title: "Management Studies",
      category: "Management",
      icon: "📊",
      description: "Management",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    media_production: {
      title: "Media Production & Digital Marketing",
      category: "Media",
      icon: "🎬",
      description: "Media Production & Digital Marketing",
      thumb: "assets/thumbs/room3.jpg",
      panorama: "assets/images/room3.jpg",
      hotSpots: [
        {
          id: "hot_media_production_1",
          pitch: 5.435713101463025,
          yaw: -35.17422129205289,
          type: "info",
          text: "Studio",
          cssClass: "custom-hotspot",
          createTooltipArgs: { title: "Studio", icon: "assets/icons/location-mark.png" }
        }
      ]
    },
    agriculture: {
      title: "Agriculture",
      category: "Agricultural Sciences",
      icon: "🌾",
      description: "Agricultural Sciences",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    water_institute: {
      title: "Water Institute",
      category: "Agricultural Sciences",
      icon: "💧",
      description: "Water Institute",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    medical_lab_technology: {
      title: "Medical Laboratory Technology",
      category: "Health Sciences",
      icon: "🧫",
      description: "Medical Laboratory Technology",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    radiography_imaging: {
      title: "Radiography & Imaging Technology",
      category: "Health Sciences",
      icon: "🩻",
      description: "Radiography & Imaging Technology",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    operation_theatre_anesthesia: {
      title: "Operation Theatre & Anesthesia Technology",
      category: "Health Sciences",
      icon: "🏥",
      description: "Operation Theatre & Anesthesia Technology",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    emmanuel_auditorium: {
      title: "Emmanuel Auditorium",
      category: "Auditoriums",
      icon: "🎤",
      description: "Emmanuel Auditorium",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    elshaddai_auditorium: {
      title: "Elshaddai Auditorium",
      category: "Auditoriums",
      icon: "🎭",
      description: "Elshaddai Auditorium",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    },
    dgs_auditorium: {
      title: "DGS Auditorium",
      category: "Auditoriums",
      icon: "🎭",
      description: "DGS Auditorium",
      thumb: "assets/thumbs/room1.jpg",
      panorama: "assets/images/room1.jpg",
      hotSpots: []
    }
  }
};

// -----------------------------------------------------------------------------
// Roads / Pathways quick-edit block
// Edit these values to adjust the hidden path scene and campus play hotspot.
// Keep this scene out of the menu because it is an alternate route, not a main scene.
// -----------------------------------------------------------------------------
const ROAD_PATH_CONFIG = {
  defaultRoadSceneId: "roads_main_rd_1",
  playHotspot: {
    id: "play_roads_hotspot",
    pitch: 6.8261718750000002,
    yaw: -1.6,
    type: "scene",
    text: "Start Virtual",
    sceneId: "roads_main_rd_1",
    cssClass: "custom-hotspot play-hotspot",
    createTooltipArgs: {
      title: "Start Virtual Tour",
      icon: "assets/icons/play_btn.png"
    }
  },
  // main_rd_1: {
  //   title: "Roads / Pathways",
  //   icon: "🛣️",
  //   description: "Campus road pathway route",
  //   category: "Routes",
  //   showInMenu: false,
  //   thumb: "assets/images/roads/main_rd_1.jpg",
  //   panorama: "assets/images/roads/main_rd_1.jpg",
  //   Yaw: -90,
  //   hotSpots: [
  //     {
  //       id: "hot_main_rd_1_to_main_rd_2",
  //       pitch: -19.52252154811785,
  //       yaw: -108.17448259963089,
  //       sceneId: "main_rd_2",
  //       cssClass: "custom-hotspot",
  //       createTooltipArgs: {
  //         title: "",
  //         icon: "assets/icons/rd_arrow.webm"
  //       }
  //     }
  //   ]
  // }
};

// -----------------------------------------------------------------------------
// Easy roadmap editing helper
// Copy this pattern for any future road scene you add:
//
// TOUR_CONFIG.scenes.YOUR_SCENE_NAME = {
//   title: "Roads / Your Scene Name",
//   icon: "🛣️",
//   description: "Campus road pathway route",
//   category: "Routes",
//   showInMenu: false,
//   thumb: "assets/images/roads/YOUR_SCENE_NAME.jpg",
//   panorama: "assets/images/roads/YOUR_SCENE_NAME.jpg",
//   hotSpots: [
//     {
//       id: "hot_YOUR_SCENE_NAME_to_NEXT_SCENE_NAME",
//       pitch: -19.52252154811785,
//       yaw: -108.17448259963089,
//       sceneId: "NEXT_SCENE_NAME",
//       cssClass: "custom-hotspot",
//       createTooltipArgs: {
//         title: "",
//         icon: "assets/icons/rd_arrow.webm"
//       }
//     }
//   ]
// };
//
// If a scene has no next scene, use:
// hotSpots: []
// -----------------------------------------------------------------------------

TOUR_CONFIG.scenes.main_rd_1 = {
  title: "Roads / Main Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_1.jpg",
  panorama: "assets/images/roads/main_rd_1.jpg",
  yaw: -90,
  hotSpots: [
    {
      id: "hot_main_rd_1_to_main_rd_2",
      pitch: -19.52252154811785,
      yaw: -108.17448259963089,
      sceneId: "main_rd_2",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.main_rd_2 = {
  title: "Roads / Main Rd 2",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_2.jpg",
  panorama: "assets/images/roads/main_rd_2.jpg",
  yaw: 90,
  hotSpots: [
    {
      id: "hot_main_rd_2_to_main_rd_3",
      pitch: -17.5,
      yaw: 88,
      sceneId: "main_rd_3",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_2_to_main_rd_1",
      pitch: -16,
      yaw: -101,
      sceneId: "main_rd_1",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.main_rd_3 = {
  title: "Roads / Main Rd 3",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_3.jpg",
  panorama: "assets/images/roads/main_rd_3.jpg",
  yaw: -45,
  hotSpots: [
    {
      id: "hot_main_rd_3_to_main_rd_4",
      pitch: -18,
      yaw: -43,
      sceneId: "main_rd_4",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_3_to_main_rd_2",
      pitch: -22,
      yaw: 135,
      sceneId: "main_rd_2",
      cssClass: "custom-hotspot",
      targetYaw: 270,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.main_rd_4 = {
  title: "Roads / Main Rd 4",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_4.jpg",
  panorama: "assets/images/roads/main_rd_4.jpg",
  yaw: 90,
  hotSpots: [
    {
      id: "hot_main_rd_4_to_main_rd_5",
      pitch: -21,
      yaw: 75,
      sceneId: "main_rd_5",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_4_to_main_rd_3",
      pitch: -20,
      yaw: -96,
      sceneId: "main_rd_3",
      cssClass: "custom-hotspot",
      targetYaw: 180,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_4_to_agri_dpt_rd_1",
      pitch: -19,
      yaw: -7,
      sceneId: "agri_dpt_rd_1",
      cssClass: "custom-hotspot",
      targetYaw: 180,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.main_rd_5 = {
  title: "Roads / Main Rd 5",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_5.jpg",
  panorama: "assets/images/roads/main_rd_5.jpg",
  // yaw: -90,
  hotSpots: [
    {
      id: "hot_main_rd_5_to_main_rd_6",
      pitch: -16,
      yaw: 4,
      sceneId: "main_rd_6",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_5_to_main_rd_4",
      pitch: -19,
      yaw: 183,
      sceneId: "main_rd_4",
      cssClass: "custom-hotspot",
      targetYaw: 270,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.main_rd_6 = {
  title: "Roads / Main Rd 6",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_6.jpg",
  panorama: "assets/images/roads/main_rd_6.jpg",
  yaw: -90,
  hotSpots: [
    {
      id: "hot_main_rd_6_to_main_rd_7",
      pitch: -11,
      yaw: -85,
      sceneId: "main_rd_7",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_6_to_main_rd_5",
      pitch: -19,
      yaw: 103,
      sceneId: "main_rd_5",
      cssClass: "custom-hotspot",
      targetYaw: 180,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.main_rd_7 = {
  title: "Roads / Main Rd 7",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_7.jpg",
  panorama: "assets/images/roads/main_rd_7.jpg",
  // yaw: -90,
  hotSpots: [
    {
      id: "hot_main_rd_7_to_main_rd_8",
      pitch: -17,
      yaw: 9,
      sceneId: "main_rd_8",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_7_to_main_rd_6",
      pitch: -25,
      yaw: -174,
      sceneId: "main_rd_6",
      cssClass: "custom-hotspot",
      targetYaw: 90,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_main_rd_7_to_can_rd_1",
      pitch: -22,
      yaw: -94,
      sceneId: "can_rd_1",
      cssClass: "custom-hotspot",
      targetYaw: 90,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.main_rd_8 = {
  title: "Roads / Main Rd 8",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/main_rd_8.jpg",
  panorama: "assets/images/roads/main_rd_8.jpg",
  hotSpots: [
        {
      id: "hot_main_rd_8_to_main_rd_7",
      pitch: -18,
      yaw: 143,
      targetYaw: 180,
      sceneId: "main_rd_7",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.lib_rd_1 = {
  title: "Roads / Lib Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/lib_rd_1.jpg",
  panorama: "assets/images/roads/lib_rd_1.jpg",
  hotSpots: [
    {
      id: "hot_lib_rd_1_to_lib_rd_2",
      pitch: -17,
      yaw: 14,
      sceneId: "lib_rd_2",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.lib_rd_2 = {
  title: "Roads / Lib Rd 2",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/lib_rd_2.jpg",
  panorama: "assets/images/roads/lib_rd_2.jpg",
  hotSpots: [
    {
      id: "hot_lib_rd_2_to_lib_rd_3",
      pitch: -19.52252154811785,
      yaw: -108.17448259963089,
      sceneId: "lib_rd_3",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.lib_rd_3 = {
  title: "Roads / Lib Rd 3",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/lib_rd_3.jpg",
  panorama: "assets/images/roads/lib_rd_3.jpg",
  hotSpots: []
};

TOUR_CONFIG.scenes.ece_rd_1 = {
  title: "Roads / Ece Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/ece_rd_1.jpg",
  panorama: "assets/images/roads/ece_rd_1.jpg",
  hotSpots: [
    {
      id: "hot_ece_rd_1_to_ece_rd_2",
      pitch: -19.52252154811785,
      yaw: -108.17448259963089,
      sceneId: "ece_rd_2",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.ece_rd_2 = {
  title: "Roads / Ece Rd 2",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/ece_rd_2.jpg",
  panorama: "assets/images/roads/ece_rd_2.jpg",
  hotSpots: [
    {
      id: "hot_ece_rd_2_to_ece_rd_3",
      pitch: -19.52252154811785,
      yaw: -108.17448259963089,
      sceneId: "ece_rd_3",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.ece_rd_3 = {
  title: "Roads / Ece Rd 3",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/ece_rd_3.jpg",
  panorama: "assets/images/roads/ece_rd_3.jpg",
  hotSpots: []
};

TOUR_CONFIG.scenes.em_rd_1 = {
  title: "Roads / Em Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/em_rd_1.jpg",
  panorama: "assets/images/roads/em_rd_1.jpg",
  hotSpots: [
    {
      id: "hot_em_rd_1_to_em_rd_2",
      pitch: -14,
      yaw: 87,
      sceneId: "em_rd_2",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_em_rd_1_to_can_rd_1",
      pitch: -12,
      yaw: -15,
      sceneId: "can_rd_1",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.em_rd_2 = {
  title: "Roads / Em Rd 2",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/em_rd_2.jpg",
  panorama: "assets/images/roads/em_rd_2.jpg",
  hotSpots: [
    {
      id: "hot_em_rd_2_to_em_rd_1",
      pitch: -22.2,
      yaw: -186,
      sceneId: "em_rd_1",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "hot_em_rd_2_to_em_rd_3",
      pitch: -15,
      yaw: -9,
      sceneId: "em_rd_3",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.em_rd_3 = {
  title: "Roads / Em Rd 3",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/em_rd_3.jpg",
  panorama: "assets/images/roads/em_rd_3.jpg",
  hotSpots: [
    {
      id: "em_rd_3_to_agri_rd_1",
      pitch: -13,
      yaw: -172,
      sceneId: "agri_dpt_rd_1",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "em_rd_3_to_em_rd_2",
      pitch: -14,
      yaw: 86,
      sceneId: "em_rd_2",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.rose_rd_1 = {
  title: "Roads / Rose Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/rose_rd_1.jpg",
  panorama: "assets/images/roads/rose_rd_1.jpg",
  hotSpots: [
    {
      id: "hot_rose_rd_1_to_rose_rd_2",
      pitch: -19.52252154811785,
      yaw: -108.17448259963089,
      sceneId: "rose_rd_2",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.rose_rd_2 = {
  title: "Roads / Rose Rd 2",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/rose_rd_2.jpg",
  panorama: "assets/images/roads/rose_rd_2.jpg",
  hotSpots: [
    {
      id: "hot_rose_rd_2_to_rose_rd_3",
      pitch: -19.52252154811785,
      yaw: -108.17448259963089,
      sceneId: "rose_rd_3",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.rose_rd_3 = {
  title: "Roads / Rose Rd 3",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/rose_rd_3.jpg",
  panorama: "assets/images/roads/rose_rd_3.jpg",
  hotSpots: [
    {
      id: "hot_rose_rd_3_to_rose_rd_4",
      pitch: -19.52252154811785,
      yaw: -108.17448259963089,
      sceneId: "rose_rd_4",
      cssClass: "custom-hotspot",
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.rose_rd_4 = {
  title: "Roads / Rose Rd 4",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/rose_rd_4.jpg",
  panorama: "assets/images/roads/rose_rd_4.jpg",
  hotSpots: []
};

TOUR_CONFIG.scenes.aero_rd_1 = {
  title: "Roads / Aero Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/aero_rd_1.jpg",
  panorama: "assets/images/roads/aero_rd_1.jpg",
  hotSpots: []
};

TOUR_CONFIG.scenes.agri_dpt_rd_1 = {
  title: "Roads / Agri Dpt Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/agri_dpt_rd_1.jpg",
  panorama: "assets/images/roads/agri_dpt_rd_1.jpg",
  hotSpots: [
    {
      id: "agri_dpt_rd_1_to_em_rd_3",
      pitch: -10,
      yaw: 78,
      sceneId: "em_rd_3",
      cssClass: "custom-hotspot",
      targetYaw: 180,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "agri_dpt_rd_1_to_main_rd_4",
      pitch: -18,
      yaw: -103,
      sceneId: "main_rd_4",
      cssClass: "custom-hotspot",
      targetYaw: 180,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

TOUR_CONFIG.scenes.can_rd_1 = {
  title: "Roads / Can Rd 1",
  icon: "🛣️",
  description: "Campus road pathway route",
  category: "Routes",
  showInMenu: false,
  thumb: "assets/images/roads/can_rd_1.jpg",
  panorama: "assets/images/roads/can_rd_1.jpg",
  hotSpots: [
    {
      id: "can_rd_1_to_main_rd_7",
      pitch: -23,
      yaw: 165,
      sceneId: "main_rd_7",
      cssClass: "custom-hotspot",
      targetYaw: 180,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    },
    {
      id: "can_rd_1_to_em_rd_1",
      pitch: -14,
      yaw: -18,
      sceneId: "em_rd_1",
      cssClass: "custom-hotspot",
      targetYaw: 180,
      createTooltipArgs: {
        title: "",
        icon: "assets/icons/rd_arrow.webm"
      }
    }
  ]
};

if (TOUR_CONFIG.scenes.main_rd_1) {
  TOUR_CONFIG.scenes[ROAD_PATH_CONFIG.defaultRoadSceneId] = TOUR_CONFIG.scenes.main_rd_1;
}

if (!TOUR_CONFIG.scenes.campus_aerial.hotSpots.some(h => h && h.id === ROAD_PATH_CONFIG.playHotspot.id)) {
  TOUR_CONFIG.scenes.campus_aerial.hotSpots.push(ROAD_PATH_CONFIG.playHotspot);
}
