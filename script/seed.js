"use strict";

const { db } = require("../server/db");
const {
  models: { User, Plant, Order, Order_Plant },
} = require("../server/db");

//seed dummy data
const plants = [
  {
    plant_name: "Aluminum Plant",
    description:
      "An easy going house plant that is generally simple to please.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/aluminum_plant.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 98.0,
    stock: 100,
  },
  {
    plant_name: "Areca Palm",
    description: "A cane type palm growing up to 8ft tall with mulitple stems.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/areca_palm_1.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 41.94,
    stock: 77,
  },
  {
    plant_name: "Boston Fern",
    description: "One of the easier ferns to grow indoors.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/boston_ferns_in_hanging_baskets_1.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 17.37,
    stock: 32,
  },
  {
    plant_name: "Cast Iron Plant",
    description:
      "Receives its common name for its ability to withstand neglect. A nice an easy to care for foliage plant.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Aspidistra_Elatior.jpg",
    category: "House Plant",
    easeOfCare: "Medium",
    price: 37.46,
    stock: 47,
  },
  {
    plant_name: "Canary Date Palm",
    description:
      "A tough palm displaying long fronds with thin straight leaflets.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/canary.jpg",
    category: "House Plant",
    easeOfCare: "Medium",
    price: 40.31,
    stock: 360,
  },
  {
    plant_name: "Amaryllis",
    description:
      "Bulb flowering type plants that produce a cluster of attractive trumpet like flowers in different color variations.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/hippeastrum-plant.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 69.68,
    stock: 77,
  },
  {
    plant_name: "Bird of Paradise",
    description:
      "The Bird of Paradise is a delightfully easy to care for plant that enjoys warm, balmy days year round.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/Strelitzia_Reginae_Flower_img1.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 87.58,
    stock: 8,
  },
  {
    plant_name: "Blushing Bromeliad",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/blushing_bromeliad1.jpg",
    category: "Flowers",
    easeOfCare: "Medium",
    price: 13.57,
  },
  {
    plant_name: "Corsage Orchid",
    description:
      "The Corsage orchid is not the easiest of orchids to care due to its humidity and temperature needs.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/yellow_cattleya_orchid1.jpg",
    category: "Flowers",
    easeOfCare: "Hard",
    price: 53.47,
  },
  {
    plant_name: "Flaming Sword",
    description:
      "This species features a red sword like flower head which can grow up to 2ft tall and attractive mottled leaves.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/flaming-sword-plant.jpg",
    category: "Flowers",
    easeOfCare: "EasyHard",
    price: 2.37,
  },
  {
    plant_name: "Aloe Vera",
    description:
      "The Aloe Vera is a common house plant that has many potential heath benefits. An indoor Aloe is easy to grow and not demanding.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/aloe-foliage-1.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 63.59,
  },
  {
    plant_name: "Baby Rubber Plant",
    description:
      "Although this plant can flower its main attraction is the foliage.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/baby_rubber_plant.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 51.08,
  },
  {
    plant_name: "Bunny Ear Cactus",
    description:
      "The bunny ear cactus, also known as the polka dot cactus is a very popular plant.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Opuntia-microdasys.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 99.21,
  },
  {
    plant_name: "Christmas Cactus",
    description:
      "The Christmas cactus is the ideal house plant if a grower likes to see flowers blooming from November - January.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/christmas-cactus.jpg",
    category: "Succulent",
    easeOfCare: "Medium",
    price: 44.3,
  },
  {
    plant_name: "Christmas cheer",
    description:
      "Very close relative to the Jelly beans plant displaying leaves which turn red in sunlight.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/sedum_rubrotinctum1.jpg",
    category: "Succulent",
    easeOfCare: "Hard",
    price: 22.04,
  },
  {
    plant_name: "Coral Cactus",
    description:
      "The Coral cactus is much as the name states in one sense and not in another. It's similar looking to coral but not an actual cactus.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/coral-cactus-orig.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 81.29,
  },
  {
    plant_name: "Easter Cactus",
    description:
      "Tropical cactus that requires a certain amount of regular water in order to survive.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Hatiora-gaertneri.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 17.51,
  },
  {
    plant_name: "Golden Barrel Cactus",
    description:
      "Globe shaped type cacti suitable for growing in conservatories, on patios or other indoor glass type rooms.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Golden_Barrel_Cactus.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 11.83,
  },
  {
    plant_name: "Orchid Cactus",
    description:
      "The Orchid Cactus (forest type cacti) blooms multi-petalled bright funnel shaped flowers.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/orchid-cactus-blooming.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 63.49,
  },
  {
    plant_name: "Rat's Tail Cactus",
    description:
      "Advice about the Rat's tail cactus (scientific name: Aporocactus Flagelliformis or Disocactus flagelliformis).",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/rats-tail-cactus-flowering.jpg",
    category: "Cacti",
    easeOfCare: "Hard",
    price: 5.73,
  },
  {
    plant_name: "Peruvian Apple Cactus",
    description:
      "The apple cactus (also known as columnar, column, hedge cactus and others) displays a prominent ribbed column stem with brown colored spines.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/peruvian-apple-cactus-close-up.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 11.76,
  },
  {
    plant_name: "Chinese Evergreen",
    description: "Grown primarily for the attractive leathery leaves.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/aglaonema.png",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 84.19,
  },
  {
    plant_name: "Heart Of Jesus",
    description:
      "The caladium is a tuber species which displays the attractive bicolor leaves.",
    imageUrl: "https://www.houseplantsexpert.com/assets/images/caladium1.jpg",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 49.16,
  },
  {
    plant_name: "Lucky Bamboo",
    description: "An easy to grow plant which can thrive in soil or water.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/lucky-bamboo-plant.jpg",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 59.5,
  },
  {
    plant_name: "Madagascar Dragon Tree",
    description:
      "Most definitely one of the easiest indoor plants to grow and maintain. Dracaena Marginata trees can grow up to 6ft high.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Dracaena-marginata.jpg",
    category: "House Plants",
    easeOfCare: "Medium",
    price: 68.78,
  },
  {
    plant_name: "Mexican Fortune Tree",
    description:
      "A tree type plant growing up to 10ft tall or even kept to bonsai size indoors.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/pachira_braided_trunks.jpg",
    category: "House Plants",
    easeOfCare: "Hard",
    price: 61.81,
  },
  {
    plant_name: "Umbrella Tree",
    description:
      "An evergreen tree type species which grows up to 10ft or more tall.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/umbrella_plant.jpg",
    category: "House Plants",
    easeOfCare: "Hard",
    price: 97.02,
  },
  {
    plant_name: "Trailing Jade",
    description:
      "Trailing jade is a semi-succulent suitable for hanging baskets and windowsills.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/trailing_jade_peperomia1.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 9.21,
  },
  {
    plant_name: "Madagascar Jasmine",
    description:
      "A flowering climbing vine which blooms white colored fragrant flowers in the right conditions.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/m_jasmine2.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 15.98,
  },
  {
    plant_name: "Rose Of China",
    description:
      "All about the Rose of China (botanical name Hibiscus Rosa-Sinensis).",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Hibiscus-Rosa-Sinensis-Flower.jpg",
    category: "Flowers",
    easeOfCare: "Hard",
    price: 58.63,
  },
  {
    plant_name: "Aluminum Plant",
    description:
      "An easy going house plant that is generally simple to please.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/aluminum_plant.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 98.0,
    stock: 100,
  },
  {
    plant_name: "Areca Palm",
    description: "A cane type palm growing up to 8ft tall with mulitple stems.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/areca_palm_1.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 41.94,
    stock: 77,
  },
  {
    plant_name: "Boston Fern",
    description: "One of the easier ferns to grow indoors.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/boston_ferns_in_hanging_baskets_1.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 17.37,
    stock: 32,
  },
  {
    plant_name: "Cast Iron Plant",
    description:
      "Receives its common name for its ability to withstand neglect. A nice an easy to care for foliage plant.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Aspidistra_Elatior.jpg",
    category: "House Plant",
    easeOfCare: "Medium",
    price: 37.46,
    stock: 47,
  },
  {
    plant_name: "Canary Date Palm",
    description:
      "A tough palm displaying long fronds with thin straight leaflets.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/canary.jpg",
    category: "House Plant",
    easeOfCare: "Medium",
    price: 40.31,
    stock: 360,
  },
  {
    plant_name: "Amaryllis",
    description:
      "Bulb flowering type plants that produce a cluster of attractive trumpet like flowers in different color variations.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/hippeastrum-plant.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 69.68,
    stock: 77,
  },
  {
    plant_name: "Bird of Paradise",
    description:
      "The Bird of Paradise is a delightfully easy to care for plant that enjoys warm, balmy days year round.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/Strelitzia_Reginae_Flower_img1.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 87.58,
    stock: 8,
  },
  {
    plant_name: "Blushing Bromeliad",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/blushing_bromeliad1.jpg",
    category: "Flowers",
    easeOfCare: "Medium",
    price: 13.57,
  },
  {
    plant_name: "Corsage Orchid",
    description:
      "The Corsage orchid is not the easiest of orchids to care due to its humidity and temperature needs.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/yellow_cattleya_orchid1.jpg",
    category: "Flowers",
    easeOfCare: "Hard",
    price: 53.47,
  },
  {
    plant_name: "Flaming Sword",
    description:
      "This species features a red sword like flower head which can grow up to 2ft tall and attractive mottled leaves.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/flaming-sword-plant.jpg",
    category: "Flowers",
    easeOfCare: "EasyHard",
    price: 2.37,
  },
  {
    plant_name: "Aloe Vera",
    description:
      "The Aloe Vera is a common house plant that has many potential heath benefits. An indoor Aloe is easy to grow and not demanding.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/aloe-foliage-1.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 63.59,
  },
  {
    plant_name: "Baby Rubber Plant",
    description:
      "Although this plant can flower its main attraction is the foliage.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/baby_rubber_plant.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 51.08,
  },
  {
    plant_name: "Bunny Ear Cactus",
    description:
      "The bunny ear cactus, also known as the polka dot cactus is a very popular plant.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Opuntia-microdasys.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 99.21,
  },
  {
    plant_name: "Christmas Cactus",
    description:
      "The Christmas cactus is the ideal house plant if a grower likes to see flowers blooming from November - January.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/christmas-cactus.jpg",
    category: "Succulent",
    easeOfCare: "Medium",
    price: 44.3,
  },
  {
    plant_name: "Christmas cheer",
    description:
      "Very close relative to the Jelly beans plant displaying leaves which turn red in sunlight.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/sedum_rubrotinctum1.jpg",
    category: "Succulent",
    easeOfCare: "Hard",
    price: 22.04,
  },
  {
    plant_name: "Coral Cactus",
    description:
      "The Coral cactus is much as the name states in one sense and not in another. It's similar looking to coral but not an actual cactus.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/coral-cactus-orig.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 81.29,
  },
  {
    plant_name: "Easter Cactus",
    description:
      "Tropical cactus that requires a certain amount of regular water in order to survive.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Hatiora-gaertneri.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 17.51,
  },
  {
    plant_name: "Golden Barrel Cactus",
    description:
      "Globe shaped type cacti suitable for growing in conservatories, on patios or other indoor glass type rooms.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Golden_Barrel_Cactus.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 11.83,
  },
  {
    plant_name: "Orchid Cactus",
    description:
      "The Orchid Cactus (forest type cacti) blooms multi-petalled bright funnel shaped flowers.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/orchid-cactus-blooming.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 63.49,
  },
  {
    plant_name: "Rat's Tail Cactus",
    description:
      "Advice about the Rat's tail cactus (scientific name: Aporocactus Flagelliformis or Disocactus flagelliformis).",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/rats-tail-cactus-flowering.jpg",
    category: "Cacti",
    easeOfCare: "Hard",
    price: 5.73,
  },
  {
    plant_name: "Peruvian Apple Cactus",
    description:
      "The apple cactus (also known as columnar, column, hedge cactus and others) displays a prominent ribbed column stem with brown colored spines.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/peruvian-apple-cactus-close-up.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 11.76,
  },
  {
    plant_name: "Chinese Evergreen",
    description: "Grown primarily for the attractive leathery leaves.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/aglaonema.png",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 84.19,
  },
  {
    plant_name: "Heart Of Jesus",
    description:
      "The caladium is a tuber species which displays the attractive bicolor leaves.",
    imageUrl: "https://www.houseplantsexpert.com/assets/images/caladium1.jpg",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 49.16,
  },
  {
    plant_name: "Lucky Bamboo",
    description: "An easy to grow plant which can thrive in soil or water.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/lucky-bamboo-plant.jpg",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 59.5,
  },
  {
    plant_name: "Madagascar Dragon Tree",
    description:
      "Most definitely one of the easiest indoor plants to grow and maintain. Dracaena Marginata trees can grow up to 6ft high.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Dracaena-marginata.jpg",
    category: "House Plants",
    easeOfCare: "Medium",
    price: 68.78,
  },
  {
    plant_name: "Mexican Fortune Tree",
    description:
      "A tree type plant growing up to 10ft tall or even kept to bonsai size indoors.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/pachira_braided_trunks.jpg",
    category: "House Plants",
    easeOfCare: "Hard",
    price: 61.81,
  },
  {
    plant_name: "Umbrella Tree",
    description:
      "An evergreen tree type species which grows up to 10ft or more tall.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/umbrella_plant.jpg",
    category: "House Plants",
    easeOfCare: "Hard",
    price: 97.02,
  },
  {
    plant_name: "Trailing Jade",
    description:
      "Trailing jade is a semi-succulent suitable for hanging baskets and windowsills.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/trailing_jade_peperomia1.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 9.21,
  },
  {
    plant_name: "Madagascar Jasmine",
    description:
      "A flowering climbing vine which blooms white colored fragrant flowers in the right conditions.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/m_jasmine2.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 15.98,
  },
  {
    plant_name: "Rose Of China",
    description:
      "All about the Rose of China (botanical name Hibiscus Rosa-Sinensis).",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Hibiscus-Rosa-Sinensis-Flower.jpg",
    category: "Flowers",
    easeOfCare: "Hard",
    price: 58.63,
  },
  {
    plant_name: "Aluminum Plant",
    description:
      "An easy going house plant that is generally simple to please.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/aluminum_plant.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 98.0,
    stock: 100,
  },
  {
    plant_name: "Areca Palm",
    description: "A cane type palm growing up to 8ft tall with mulitple stems.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/areca_palm_1.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 41.94,
    stock: 77,
  },
  {
    plant_name: "Boston Fern",
    description: "One of the easier ferns to grow indoors.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/boston_ferns_in_hanging_baskets_1.jpg",
    category: "House Plant",
    easeOfCare: "Easy",
    price: 17.37,
    stock: 32,
  },
  {
    plant_name: "Cast Iron Plant",
    description:
      "Receives its common name for its ability to withstand neglect. A nice an easy to care for foliage plant.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Aspidistra_Elatior.jpg",
    category: "House Plant",
    easeOfCare: "Medium",
    price: 37.46,
    stock: 47,
  },
  {
    plant_name: "Canary Date Palm",
    description:
      "A tough palm displaying long fronds with thin straight leaflets.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/canary.jpg",
    category: "House Plant",
    easeOfCare: "Medium",
    price: 40.31,
    stock: 360,
  },
  {
    plant_name: "Amaryllis",
    description:
      "Bulb flowering type plants that produce a cluster of attractive trumpet like flowers in different color variations.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/hippeastrum-plant.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 69.68,
    stock: 77,
  },
  {
    plant_name: "Bird of Paradise",
    description:
      "The Bird of Paradise is a delightfully easy to care for plant that enjoys warm, balmy days year round.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/Strelitzia_Reginae_Flower_img1.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 87.58,
    stock: 8,
  },
  {
    plant_name: "Blushing Bromeliad",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/blushing_bromeliad1.jpg",
    category: "Flowers",
    easeOfCare: "Medium",
    price: 13.57,
  },
  {
    plant_name: "Corsage Orchid",
    description:
      "The Corsage orchid is not the easiest of orchids to care due to its humidity and temperature needs.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/yellow_cattleya_orchid1.jpg",
    category: "Flowers",
    easeOfCare: "Hard",
    price: 53.47,
  },
  {
    plant_name: "Flaming Sword",
    description:
      "This species features a red sword like flower head which can grow up to 2ft tall and attractive mottled leaves.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/flaming-sword-plant.jpg",
    category: "Flowers",
    easeOfCare: "EasyHard",
    price: 2.37,
  },
  {
    plant_name: "Aloe Vera",
    description:
      "The Aloe Vera is a common house plant that has many potential heath benefits. An indoor Aloe is easy to grow and not demanding.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/aloe-foliage-1.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 63.59,
  },
  {
    plant_name: "Baby Rubber Plant",
    description:
      "Although this plant can flower its main attraction is the foliage.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/baby_rubber_plant.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 51.08,
  },
  {
    plant_name: "Bunny Ear Cactus",
    description:
      "The bunny ear cactus, also known as the polka dot cactus is a very popular plant.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Opuntia-microdasys.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 99.21,
  },
  {
    plant_name: "Christmas Cactus",
    description:
      "The Christmas cactus is the ideal house plant if a grower likes to see flowers blooming from November - January.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/christmas-cactus.jpg",
    category: "Succulent",
    easeOfCare: "Medium",
    price: 44.3,
  },
  {
    plant_name: "Christmas cheer",
    description:
      "Very close relative to the Jelly beans plant displaying leaves which turn red in sunlight.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/sedum_rubrotinctum1.jpg",
    category: "Succulent",
    easeOfCare: "Hard",
    price: 22.04,
  },
  {
    plant_name: "Coral Cactus",
    description:
      "The Coral cactus is much as the name states in one sense and not in another. It's similar looking to coral but not an actual cactus.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/coral-cactus-orig.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 81.29,
  },
  {
    plant_name: "Easter Cactus",
    description:
      "Tropical cactus that requires a certain amount of regular water in order to survive.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Hatiora-gaertneri.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 17.51,
  },
  {
    plant_name: "Golden Barrel Cactus",
    description:
      "Globe shaped type cacti suitable for growing in conservatories, on patios or other indoor glass type rooms.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Golden_Barrel_Cactus.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 11.83,
  },
  {
    plant_name: "Orchid Cactus",
    description:
      "The Orchid Cactus (forest type cacti) blooms multi-petalled bright funnel shaped flowers.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/orchid-cactus-blooming.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 63.49,
  },
  {
    plant_name: "Rat's Tail Cactus",
    description:
      "Advice about the Rat's tail cactus (scientific name: Aporocactus Flagelliformis or Disocactus flagelliformis).",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/rats-tail-cactus-flowering.jpg",
    category: "Cacti",
    easeOfCare: "Hard",
    price: 5.73,
  },
  {
    plant_name: "Peruvian Apple Cactus",
    description:
      "The apple cactus (also known as columnar, column, hedge cactus and others) displays a prominent ribbed column stem with brown colored spines.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/peruvian-apple-cactus-close-up.jpg",
    category: "Cacti",
    easeOfCare: "Easy",
    price: 11.76,
  },
  {
    plant_name: "Chinese Evergreen",
    description: "Grown primarily for the attractive leathery leaves.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/aglaonema.png",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 84.19,
  },
  {
    plant_name: "Heart Of Jesus",
    description:
      "The caladium is a tuber species which displays the attractive bicolor leaves.",
    imageUrl: "https://www.houseplantsexpert.com/assets/images/caladium1.jpg",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 49.16,
  },
  {
    plant_name: "Lucky Bamboo",
    description: "An easy to grow plant which can thrive in soil or water.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/lucky-bamboo-plant.jpg",
    category: "House Plants",
    easeOfCare: "Easy",
    price: 59.5,
  },
  {
    plant_name: "Madagascar Dragon Tree",
    description:
      "Most definitely one of the easiest indoor plants to grow and maintain. Dracaena Marginata trees can grow up to 6ft high.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Dracaena-marginata.jpg",
    category: "House Plants",
    easeOfCare: "Medium",
    price: 68.78,
  },
  {
    plant_name: "Mexican Fortune Tree",
    description:
      "A tree type plant growing up to 10ft tall or even kept to bonsai size indoors.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/pachira_braided_trunks.jpg",
    category: "House Plants",
    easeOfCare: "Hard",
    price: 61.81,
  },
  {
    plant_name: "Umbrella Tree",
    description:
      "An evergreen tree type species which grows up to 10ft or more tall.",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/umbrella_plant.jpg",
    category: "House Plants",
    easeOfCare: "Hard",
    price: 97.02,
  },
  {
    plant_name: "Trailing Jade",
    description:
      "Trailing jade is a semi-succulent suitable for hanging baskets and windowsills.",
    imageUrl:
      "https://www.houseplantsexpert.com/assets/images/trailing_jade_peperomia1.jpg",
    category: "Succulent",
    easeOfCare: "Easy",
    price: 9.21,
  },
  {
    plant_name: "Madagascar Jasmine",
    description:
      "A flowering climbing vine which blooms white colored fragrant flowers in the right conditions.",
    imageUrl: "https://www.houseplantsexpert.com/image-files/m_jasmine2.jpg",
    category: "Flowers",
    easeOfCare: "Easy",
    price: 15.98,
  },
  {
    plant_name: "Rose Of China",
    description:
      "All about the Rose of China (botanical name Hibiscus Rosa-Sinensis).",
    imageUrl:
      "https://www.houseplantsexpert.com/image-files/Hibiscus-Rosa-Sinensis-Flower.jpg",
    category: "Flowers",
    easeOfCare: "Hard",
    price: 58.63,
  },
];

const users = [
  {
    firstName: "Cody",
    lastName: "Fullstack",
    email: "cody@fullstack.com",
    password: "123",
    image:
      "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3553386734099169",
    isAdmin: true,
    isLoggedIn: true,
  },

  {
    firstName: "Fawne",
    lastName: "Lunt",
    email: "flunt0@va.gov",
    password: "WrwpJz",
    image:
      "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3553386734099169",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Sarina",
    lastName: "Cranham",
    email: "scranham1@biglobe.ne.jp",
    password: "a11LEFOGHYM",
    image:
      "https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    creditCard: "4844087180715467",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Maiga",
    lastName: "Sigg",
    email: "msigg2@yahoo.co.jp",
    password: "dRGPjP",
    image:
      "https://images.pexels.com/photos/3981337/pexels-photo-3981337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "30356510277759",
    isAdmin: true,
    isLoggedIn: true,
  },
  {
    firstName: "Etheline",
    lastName: "Wardle",
    email: "ewardle3@washington.edu",
    password: "6Eq3Ld0sE",
    image:
      "https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=12600",
    creditCard: "3557474566891576",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Kori",
    lastName: "Doig",
    email: "kdoig4@chronoengine.com",
    password: "PValKs",
    image:
      "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "56022106041440869",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Calhoun",
    lastName: "Riley",
    email: "criley5@bbc.co.uk",
    password: "QK1wEhWpQipe",
    image:
      "https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3543018002553295",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Guntar",
    lastName: "Works",
    email: "gworks6@scientificamerican.com",
    password: "zYj5pkM4V",
    image:
      "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3551452110394848",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Britt",
    lastName: "Burroughes",
    email: "bburroughes7@addtoany.com",
    password: "zY3OpK",
    image:
      "https://images.pexels.com/photos/2755165/pexels-photo-2755165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3572512095378655",
    isAdmin: true,
    isLoggedIn: true,
  },
  {
    firstName: "Sammy",
    lastName: "Camolli",
    email: "scamolli8@theglobeandmail.com",
    password: "dsHpmuHb",
    image:
      "https://images.pexels.com/photos/3283568/pexels-photo-3283568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "36215661618936",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Marve",
    lastName: "Singyard",
    email: "msingyard9@taobao.com",
    password: "67QCvPsO0v",
    image:
      "https://images.pexels.com/photos/2846602/pexels-photo-2846602.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "676743033920616471",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Tripp",
    lastName: "Vasey",
    email: "tvaseya@pagesperso-orange.fr",
    password: "uPoJfsn",
    image:
      "https://images.pexels.com/photos/3186558/pexels-photo-3186558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3566326342490850",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Eleanor",
    lastName: "Igoe",
    email: "eigoeb@bluehost.com",
    password: "5u4RVKVqT9Gu",
    image:
      "https://images.pexels.com/photos/2853198/pexels-photo-2853198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "5519215249540870",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Thurston",
    lastName: "Charsley",
    email: "tcharsleyc@chronoengine.com",
    password: "eMB1c3WMfNz",
    image:
      "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3546524213168432",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Ashien",
    lastName: "Avraham",
    email: "aavrahamd@washington.edu",
    password: "zBafKvfOiHr",
    image:
      "https://images.pexels.com/photos/3220360/pexels-photo-3220360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3589227318519974",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Gilemette",
    lastName: "Hadcroft",
    email: "ghadcrofte@admin.ch",
    password: "KPBexFSzqkFL",
    image:
      "https://images.pexels.com/photos/3438086/pexels-photo-3438086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "30394033367864",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Belinda",
    lastName: "Santer",
    email: "bsanterf@google.de",
    password: "uVLpiY2Xs",
    image:
      "https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "5412925549721842",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Meta",
    lastName: "Dunkerly",
    email: "mdunkerlyg@hubpages.com",
    password: "lZG3a9E5y3",
    image:
      "https://images.pexels.com/photos/4063856/pexels-photo-4063856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    creditCard: "3557866914492769",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Shep",
    lastName: "Nobes",
    email: "snobesh@myspace.com",
    password: "3NPjOcOV",
    image:
      "https://images.pexels.com/photos/4890733/pexels-photo-4890733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "5048371044663407",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Cristina",
    lastName: "Tombling",
    email: "ctomblingi@github.io",
    password: "0dFos4kN",
    image:
      "https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "374283814021879",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Berget",
    lastName: "Rainard",
    email: "brainardj@dedecms.com",
    password: "rQQ3iFHP15D",
    image:
      "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3559410320074750",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Janella",
    lastName: "Logsdale",
    email: "jlogsdalek@ucoz.com",
    password: "rBdsHO7cwLN",
    image:
      "https://images.pexels.com/photos/5046546/pexels-photo-5046546.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3556224052982061",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Jaime",
    lastName: "Quinlan",
    email: "jquinlanl@google.co.uk",
    password: "wbuhLlMgZ8bG",
    image:
      "https://images.pexels.com/photos/2530775/pexels-photo-2530775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3537994524894912",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Alisun",
    lastName: "De Vuyst",
    email: "adevuystm@dagondesign.com",
    password: "tld8hGM80v",
    image:
      "https://images.pexels.com/photos/4662950/pexels-photo-4662950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "3536014665687073",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Kacy",
    lastName: "Gartery",
    email: "kgarteryn@sohu.com",
    password: "YegNlwMY",
    image:
      "https://images.pexels.com/photos/5034475/pexels-photo-5034475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "201523700563537",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Codie",
    lastName: "Frantz",
    email: "cfrantzo@usa.gov",
    password: "E0PDT7xVP5L",
    image:
      "https://images.pexels.com/photos/2703181/pexels-photo-2703181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    creditCard: "6759571749375366",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Mead",
    lastName: "Clapson",
    email: "mclapsonp@squarespace.com",
    password: "L6ASCQhd",
    image:
      "https://images.pexels.com/photos/914472/pexels-photo-914472.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    creditCard: "6331105523200685",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Essie",
    lastName: "Posselt",
    email: "eposseltq@jigsy.com",
    password: "vskN6N8",
    image:
      "https://images.pexels.com/photos/2552127/pexels-photo-2552127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    creditCard: "374622234064896",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Milton",
    lastName: "Paolo",
    email: "mpaolor@wordpress.com",
    password: "qpoNu4VCqfq",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    creditCard: "6399825394724641",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Kalvin",
    lastName: "Disman",
    email: "kdismans@yelp.com",
    password: "qtnJt9",
    image:
      "https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940/",
    creditCard: "3579532525940216",
    isAdmin: false,
    isLoggedIn: true,
  },
  {
    firstName: "Delly",
    lastName: "Pidduck",
    email: "dpidduckt@squidoo.com",
    password: "G5LOC3NM",
    image:
      "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    creditCard: "3566927484544493",
    isAdmin: false,
    isLoggedIn: true,
  },
];


const orders = [
  {
    totalPrice: 1000,
    transactionComplete: true,
    userId: 5
  },
  {
    totalPrice: 20,
    transactionComplete: true,
    userId: 30
  },
  {
    totalPrice: 45,
    transactionComplete: true,
    userId: 2
  },
  {
    totalPrice: 28,
    transactionComplete: false,
    userId: 20
  },
  {
    totalPrice: 39,
    transactionComplete: true,
    userId: 4
  }
];

const orderPlants = [
  {
    plant_price: 98,
    stock: 4,
    orderId: 4,
    plantId: 1
  },
  {
    plant_price: 34,
    stock: 1,
    orderId: 2,
    plantId: 20
  },
  {
    plant_price: 20,
    stock: 1,
    orderId: 1,
    plantId: 3
  }
]

const seed = async () => {
  try {
    await db.sync({ force: true });

    await User.bulkCreate(users);

    await Plant.bulkCreate(plants);

    await Order.bulkCreate(orders);

    await Order_Plant.bulkCreate(orderPlants)



  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}
