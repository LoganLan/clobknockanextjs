/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Red_Colors: {
          'Lavender_Blush': '#fff1f1',
          'Misty_Rose': '#ffdfdf',
          'Tea_Rose': '#ffc5c5',
          'Salmon_Pink': '#ff9d9d',
          'bittersweet': '#ff6464',
          'Red': '#ff1f1f',
          'Red(CMYK)': '#ed1515',
          'Engineering_Orange': '#c80d0d',
          'Rufous': '#a50f0f',
          'OU_crimson': '#881414',
          'black_Bean': '#4b0404',
        },
        Orange_Colors: {
          'Red': '#ff0000',
          'Light Salmon': '#ffa07a',
          'Salmon': '#fa8072',
          'Light Coral': '#f08080',
          'Dark Salmon': '#e9967a',
          'Tomato': '#ff6347',
          'Indian Red': '#cd5c5c',
          'Orange Red': '#ff4500',
          'Crimson': '#dc143c',
          'Fire Brick': '#b22222',
          'Dark Red': '#8b0000',
          'Maroon': '#800000',
        },
        White_Colors: {
          'white': '#ffffff', //50
          'anti-flash-white': '#efefef', //100
          'platinum': '#dcdcdc', // 200
          'silver': '#bdbdbd', // 300
          'battleship-grey': '#989898', // 400
          'Gray': '#7c7c7c', //500
          'Dim-Gray': '#656565', // 600
          'Davys-Gray': '#525252', // 700
          'outer-space': '#464646', // 800
          'Onyx': '#3d3d3d', // 900
          'Jet': '#292929', // 950
        },
        Yellow_Colors: {
          'beige': '#fcfee8',
          'cream': '#f9ffc2',
          'mindaro': '#f6ff87',
          'Icterine': '#F4F94A',
          'Aureolin': '#F1ED1E',
          'Yellow': '#efe103',
          'old-gold': '#ceb200',
          'Dark-goldenrod': '#a48004',
          'Golden-brown': '#88640b',
          'field-drab': '#735110',
          'cafe-noir': '#432b05',
        },
        Green_Colors: {
          'Nyanza': '#e8ffe4',
          'Tea_Green': '#caffc4',
          'Screamin`_Green': '#9aff90',
          'Erin': '#59ff50',
          'Green': '#22ff1f',
          'SGBUS_Green': '#00e603',
          'Kelly_Green': '#00b807',
          'India_Green': '#008b06',
          'Dartmouth_Green': '#0b5c10',
          'Pakistan_Green': '#003406',
        },
        Cyan_Colors: {
          'Azure_(Web)': '#edfffd',
          'Celeste': '#c0fffc',
          'Ice_Blue': '#81fffa',
          'Aqua': '#3afff9',
          'Fluorescent_Cyan': '#1ffff0',
          'Turquoise': '#00e2d4',
          'Light_Sea_Green': '#00b7b0',
          'Dark_Cyan': '#00918d',
          'Caribbean_Current': '#007271',
          'Bruhswick_Green': '#005250',
          'Midnight_Green': '#00383a',
        },
        Blue_Colors: {
          'Alice_Blue': '#ebf5ff',
          'Columbia_Blue': '#C9E0FA',
          'Uranian_Blue': '#bedaff',
          'Jordy_Blue': '#97c0ff',
          'Cornflower_Blue': '#6e9aff',
          'Blue_(Crayola)': '#4c75ff',
          'Palatinate_Blue': '#1f40ff',
          'Persian_Blue': '#1d33b6',
          'Zaffre': '#0D23B5',
          'Egyptian_Blue': '#20338f',
          'Penn_Blue': '#131c53',
        },
        Pink_Colors: {
          'MiMi_Pink': '#FFDEF6',
          'Lavender_Pink': '#FFBEED',
          'Plum_(Web)': '#FF99E2',
          'Persian_Pink': '#FF85DC',
          'Rose_Pink': '#FF70D7',
          'Razzle_Dazzle_Rose': '#FF47CB',
          'Shocking_Pink': '#FF1FBF',
          'Hollywood_Cerise': '#F500AF',
          'Murrey': '#8F0066',
          'Byzantium': '#721d68',
          'Tyrian_PUrple': '#520039',
        },
        Purple_Colors: {
          'Magnolia': '#fef4ff',
          'Pale_Purple': '#fde7ff',
          'Purple_Pizzazz': '#FD49EE',
          'Hot_Magenta': '#F202DE',
          'Steel_Purple': '#CA02B9',
          'Fandango': '#B602A7',
          'Dark_Magenta': '#A10294',
          'Mardi_Gras': '#8D0281',
          'Purple': '#78026E',
          'palatinate': '#64025C',
          'Russian_Violet': '#41013c',
        }, 
      }
    }
  },
  plugins: [],
};

