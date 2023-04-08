export const filterLaborsByType = (labors) => {
   return labors.reduce((arr, labor) => {
    const { type } = labor;
    if (arr[type]) {
      arr[type].push(labor);
    } else {
      arr[type] = [labor];
    }
    return arr;
  }, {});
};

//
// let laborArray = [
//   { linkedin: ' ', _id: "6421d7b1c9197c04745f58ac", image: 'https://i.ibb.co/RgfQ1VM/Sai-ul-lah.jpg', name: 'Sai-ul-lah', age: 60, CNIC: '3520113099655', type: 'Mistri', },
//   { linkedin: ' ', _id: "6421d7b2c9197c04745f58b0", image: 'https://i.ibb.co/QKBFc6p/Muhammad-Jameel.jpg', name: 'Muhammad Jameel', age: 19, CNIC: '3110552420761', type: 'Mistri', },
//   { linkedin: ' ', _id: "6421d7b2c9197c04745f58b8", image: 'https://i.ibb.co/cNZq5Gr/Wahid.jpg', name: 'Wahid', age: 55, CNIC: ' ', type: 'Mazdoor', }
// ];
//
// let laborByType = filterLaborsByType(laborArray);
//  console.log(typeof ==laborByType);
// // laborByType.map((labor) => {
// //   console.log(labor);
// // });