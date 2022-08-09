import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { StadiumInfo } from '../models/stadiums/stadium.model';

interface Props {
  data: StadiumInfo;
}
function Stadium({ data }: Props) {
  const zoomInProperties = {
    indicators: true,
    scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: <FaArrowAltCircleLeft className="w-5 h-5" />,
    nextArrow: <FaArrowAltCircleRight className="w-5 h-5" />,
  };
  return (
    <div className="cursor-pointer max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <Zoom {...zoomInProperties}>
        {data.stadiumMedias.length > 0 ? (
          data.stadiumMedias.map((each, index) => (
            <div key={index} className="flex justify-center w-full h-full">
              <img
                className="w-[90%] object-cover rounded-lg shadow-xl"
                src={each.stadiumImageUrl}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-center w-full h-full">
            <img
              className="w-[90%] object-cover rounded-lg shadow-xl"
              src="/images/no-image.png"
              alt="Sunset in the mountains"
            ></img>
          </div>
        )}
      </Zoom>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.name}</div>
        <p className="text-gray-800 min-h-8 break-all">{data.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}

export default Stadium;
