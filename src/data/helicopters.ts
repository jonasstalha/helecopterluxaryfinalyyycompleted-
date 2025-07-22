import { Helicopter } from '../types';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';
import img14 from '../assets/14.jpg';
import img16 from '../assets/16.jpg';
import img17 from '../assets/17.jpg';

// Array of real helicopter packages with fixed images
export const helicopterPackages: Helicopter[] = [
  {
    id: '1',
    name: 'Helicopter Ride & Dinner Package',
    model: 'Vegas Luxury',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 829,
    images: [img10, img1, img2, img3, img4, img5], // Fixed images with img10 as primary
    features: [
      'VIP Limo',
      'VIP Check-In',
      'Helicopter',
      'Gourmet Dinner',
    ],
    specifications: {
      maxSpeed: '140 mph',
      range: '340 nm',
      ceiling: '12,500 ft',
      engines: '1 x Turbomeca Arriel 2B1'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever dreamed of starting your Las Vegas evening with a breathtaking flight over the Strip and ending with a gourmet dinner at a top-rated restaurant? Our Helicopter Ride & Dinner Package is the perfect blend of excitement and elegance.

Begin your journey with a luxury limo transfer and VIP lounge access. Then, soar high above the neon-lit city before indulging in a reserved four-course dinner, complete with VIP seating and optional champagne to toast the night.

Departing From: Las Vegas Strip
Destination: Las Vegas Strip & Top Restaurant
Duration: Approximately 3–3.5 hours from hotel pick-up to drop-off
Product Code: HDP-VIP

Tour Highlights
• Helicopter flight above the Las Vegas Strip and Downtown
• VIP check-in and private lounge experience
• Luxury limo pick-up and drop-off
• Reserved gourmet dinner at a top-rated Strip restaurant
• Optional champagne or dessert upgrades

Included
• Helicopter ride over the Strip
• Limo transfers
• VIP lounge access
• Four-course dinner reservation (tax & gratuity included)

Planning
• Tour Duration: Approximately 3–3.5 hours (hotel-to-hotel)
• Flight Duration: 10–12 minutes
• Dinner Duration: 1.5–2 hours
• Transportation: Hotel pickup & drop-off by private limo (included)
  Guests should be ready in hotel lobby 15 minutes prior to scheduled time

What to Bring
• Valid photo I.D. (required for all guests 18+)
• Smart-casual attire for dinner
• Appetite for great food and adventure
• Camera or smartphone for photos`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Romantic Helicopter Tour for Two',
    model: 'Robinson R44',
    manufacturer: 'Robinson',
    capacity: 2,
    pricePerHour: 1050,
    images: [img12, img17, img6, img7, img8, img9], // Fixed images with img12 as primary
    features: [
      'Private Flight',
      'Roses & Chocolates',
      'Sunset Option',
      'Limo',
    ],
    specifications: {
      maxSpeed: '130 mph',
      range: '300 nm',
      ceiling: '14,000 ft',
      engines: '1 x Lycoming IO-540-AE1A5'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever imagined surprising your partner with the most romantic evening in Las Vegas? Our Romantic Helicopter Tour for Two is crafted just for you and your loved one.

Your adventure begins with a private limo pick-up and a personalized welcome. Board your exclusive helicopter for a sunset flight above the Strip, where roses and chocolates await on board. Optional champagne and a private photographer can make your evening even more magical.

Departing From: Las Vegas Strip
Destination: Las Vegas Strip
Duration: Approximately 1½ to 2 hours from hotel pick-up to drop-off
Product Code: RHT-2

Tour Highlights
• Private helicopter flight just for two at sunset
• Bouquet of roses and gourmet chocolates on board
• Private luxury limo transfer
• VIP lounge welcome
• Optional champagne and in-flight photographer

Included
• Private helicopter tour
• Limo pick-up and drop-off
• Roses and chocolates
• VIP check-in

Planning
• Tour Duration: 1.5–2 hours (hotel-to-hotel)
• Flight Duration: 12–15 minutes
• Transportation: Limo pick-up and drop-off (included)
  Guests should be ready 10 minutes prior to pick-up

What to Bring
• Valid I.D. (for all guests 18+)
• Romantic playlist (Bluetooth welcome)
• Camera or smartphone
• Smart, comfortable clothing`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'VIP Helicopter Tour Experience',
    model: 'Airbus H125',
    manufacturer: 'Airbus',
    capacity: 4,
    pricePerHour: 1200,
    images: [img13, img9, img10, img11, img14, img1], // Fixed images with img13 as primary
    features: [
      'VIP Lounge',
      'Champagne',
      'Premium Route',
      'Luxury Transfer',
    ],
    specifications: {
      maxSpeed: '145 mph',
      range: '350 nm',
      ceiling: '13,500 ft',
      engines: '1 x Turbomeca Arriel 2D'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Ever wondered what it feels like to be treated like a true VIP in Las Vegas? The VIP Helicopter Tour Experience elevates luxury to new heights.

Enjoy a luxury SUV or stretch limo transfer and private lounge access, then skip the lines and be the first to board. Glide along a premium extended route, taking in the full glitter of the Strip and downtown, with complimentary champagne and guaranteed front-row seats.

Departing From: Las Vegas Strip
Destination: Extended Strip & Downtown
Duration: Approximately 2 hours from hotel pick-up to drop-off
Product Code: VIP-EX

Tour Highlights
• VIP lounge access and front-of-the-line boarding
• Extended, premium helicopter flight route (Strip & Downtown)
• Complimentary champagne service
• Guaranteed front-row/window seats
• Luxury SUV or stretch limo transfer

Included
• Premium helicopter flight
• Private luxury transfer
• VIP lounge & priority boarding
• Champagne

Planning
• Tour Duration: 2 hours (hotel-to-hotel)
• Flight Duration: 20–30 minutes
• Transportation: Luxury vehicle pick-up/drop-off (included)
  Arrive at lobby 15 minutes before pick-up

What to Bring
• I.D. (18+)
• Dress to impress!
• Camera or smartphone`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Luxury Grand Canyon Helicopter Excursion',
    model: 'Bell 407',
    manufacturer: 'Bell',
    capacity: 6,
    pricePerHour: 1500,
    images: [img3, img14, img1, img2, img4, img5], // Fixed images with img3 as primary
    features: [
      'Canyon Landing',
      'Champagne',
      'Scenic Flight',
      'Picnic Option',
    ],
    specifications: {
      maxSpeed: '140 mph',
      range: '330 nm',
      ceiling: '13,500 ft',
      engines: '1 x Rolls-Royce 250-C47B'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever wondered what it's like to touch down deep in the Grand Canyon? Our Luxury Grand Canyon Helicopter Excursion whisks you from Las Vegas over the Hoover Dam, Lake Mead, and Mojave Desert before landing on a private plateau 3,200 feet below the canyon rim. Celebrate with a champagne toast and an optional gourmet picnic, surrounded by breathtaking views of ancient rock formations and the Colorado River.

Departing From: Las Vegas Strip
Destination: Grand Canyon West (Landing)
Duration: Approximately 4 to 4½ hours from hotel pick-up to drop-off
Product Code: GCH-LUX

Tour Highlights
• Scenic flight over Hoover Dam, Lake Mead, and the Grand Canyon
• Canyon landing 3,200 feet below the rim
• Champagne toast and optional gourmet picnic at the canyon
• Photo time among ancient rock formations and the Colorado River
• Luxury limo transfer and VIP service

Included
• Helicopter flight (Vegas to Grand Canyon & back)
• Canyon landing
• Champagne
• Limo transfers

Planning
• Tour Duration: 4–4.5 hours (hotel-to-hotel)
• Flight Duration: 70–90 minutes total
• Ground Time: ~30 minutes at canyon
• Transportation: Limo pick-up from most major hotels (included)
  Guests ready 15 minutes before pick-up
  Self-drive option available (arrive 45 minutes before departure)

What to Bring
• I.D. (18+)
• Camera or smartphone (no selfie sticks or poles)
• Bottle of water
• Sunglasses, sunblock, and hat
• Layered clothing (March–September); warm clothes (October–March)
• Sturdy, toe-covering shoes (sneakers/hiking boots recommended)`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Helicopter Proposal Package',
    model: 'Airbus H130',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 1800,
    images: [img17, img16, img5, img4, img6, img7], // Fixed images with img17 as primary
    features: [
      'Private Flight',
      'Proposal Sign',
      'Photographer',
      'Celebration',
    ],
    specifications: {
      maxSpeed: '165 mph',
      range: '400 nm',
      ceiling: '14,500 ft',
      engines: '1 x Pratt & Whitney PT6B-37A'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever dreamed of proposing in the most unforgettable way possible? Our Helicopter Proposal Package makes your moment truly legendary.

Begin with a luxury limo ride and a private flight over Las Vegas or the Grand Canyon. At the perfect moment, spot a "Will You Marry Me?" sign on the ground—timed with your in-flight photographer to capture every emotion. Celebrate with roses, champagne, and the post-flight celebration you deserve.

Departing From: Las Vegas Strip
Destination: Las Vegas Strip or Grand Canyon
Duration: Approximately 2 to 2½ hours from hotel pick-up to drop-off
Product Code: PROPOSE-VIP

Tour Highlights
• Private helicopter for two with VIP limo pick-up
• "Will You Marry Me?" sign revealed on the ground
• Professional in-flight photographer
• Champagne and roses for celebration
• Optional dinner reservation or custom cake

Included
• Private helicopter flight
• Limo transfer
• Proposal sign
• Photographer
• Champagne & roses

Planning
• Tour Duration: 2–2.5 hours (hotel-to-hotel)
• Flight Duration: 12–30 minutes (choice of route)
• Transportation: Limo pick-up (included)
  Arrive in hotel lobby 10–15 minutes prior

What to Bring
• The engagement ring!
• Camera/smartphone (for your own memories)
• Special outfit for photos`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Anniversary & Honeymoon Celebration Tour',
    model: 'Airbus H145',
    manufacturer: 'Airbus',
    capacity: 4,
    pricePerHour: 2000,
    images: [img16, img16, img16, img16, img16, img16], // All images set to 16.jpg
    features: [
      'Roses & Cake',
      'Bubbly',
      'Playlist',
      'VIP Limo',
    ],
    specifications: {
      maxSpeed: '175 mph',
      range: '351 nm',
      ceiling: '17,000 ft',
      engines: '2 x Safran Arriel 2E'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever wanted to celebrate your love high above the lights of Las Vegas? Our Anniversary & Honeymoon Celebration Tour brings romance to new heights.

Your evening begins with a luxury limo and VIP lounge welcome, followed by a private flight over the Strip or Grand Canyon. On board, you'll find roses, a gourmet cake or desserts, bubbly, and your own custom playlist. Optional in-flight video or photography ensures every magical moment is yours to keep.

Departing From: Las Vegas Strip
Destination: Las Vegas Strip or Grand Canyon
Duration: Approximately 2 to 3 hours from hotel pick-up to drop-off
Product Code: CELEBRATE-LOVE

Tour Highlights
• Private helicopter tour with celebration kit: roses, cake/dessert, bubbly
• Custom music playlist for your special occasion
• Luxury limo round-trip and VIP welcome
• Optional in-flight video or professional photographer

Included
• Limo transfers
• Private helicopter flight
• Celebration kit (roses, cake, bubbly)
• Playlist option

Planning
• Tour Duration: 2–3 hours (hotel-to-hotel)
• Flight Duration: 12–30 minutes
• Transportation: Private limo pick-up (included)
  Ready 10 minutes before pick-up

What to Bring
• Valid I.D. (18+)
• Song list (optional)
• Camera/smartphone
• Romantic/celebratory attire`,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
