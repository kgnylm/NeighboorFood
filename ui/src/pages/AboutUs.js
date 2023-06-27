import chefImg from '../components/homepageComponents/chef_img.jpeg';
import gencay from './teamphotos/gencay.jpg';
import emre from './teamphotos/emre.jpg';
import kagan from './teamphotos/kagan.jpg';
import hasan from './teamphotos/hasan.jpg';
import gozde from './teamphotos/gözde.jpg';
import tugce from './teamphotos/tuğçe.jpg';

const AboutUs = (props) => {
  const developerTeams = [
    {
      id: '1',
      name: 'Yusuf Emre Beskan',
      image: emre,
      mail: 'emre@shanzee.com',
    },
    {
      id: '2',
      name: 'Gencay Turgut',
      image: gencay,
      mail: 'gencay@shanzee.com',
    },
    {
      id: '3',
      name: 'Mustafa Kağan Yalım',
      image: kagan,
      mail: 'kagan@shanzee.com',
    },
    {
      id: '4',
      name: 'Hasan Semih Selçuk',
      image: hasan,
      mail: 'hasan@shanzee.com',
    },
    {
      id: '5',
      name: 'Gözde Kurtulmuş',
      image: gozde,
      mail: 'gözde@gmail.com',
    },
    {
      id: '6',
      name: 'Tuğçe Türkmenler',
      image: tugce,
      mail: 'tugce0026@hotmail.com',
    },
  ];

  return (
    <div>
      <p className="text-6xl  text-center text-teal-500">Our Team</p>
      <div className="mb-60 justify-center grid grid-cols-3 ml-20 p-4 ">
        {developerTeams.map((developer, index) => {
          return (
            <div key={index} className="border-2 mt-12 bg-teal-500 flex mr-4 text-slate-100 h-72 hover:bg-teal-600 rounded-xl">
              <img
                src={developer.image}
                className="rounded-full ml-6 h-60 mt-8"
              ></img>
              <div className="mt-32 ml-12">
                <p>{developer.name}</p>
                <p>{developer.mail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AboutUs;
