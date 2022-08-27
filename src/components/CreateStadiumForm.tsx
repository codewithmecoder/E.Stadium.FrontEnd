import { zodResolver } from '@hookform/resolvers/zod';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { object, string, TypeOf } from 'zod';
import { storage } from '../lib/firebase';
import { axiosInstance } from '../lib/util';
import {
  resetStadiumId,
  setUserStadiumId,
} from '../redux/slices/stadiums/stadiumSlice';
interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
}

const createStadiumSchema = object({
  name: string().min(1, 'name is required'),
  description: string()
    .min(1, 'description is required')
    .min(20, 'description at least has 20 charactors'),
  address: string().min(1, 'address is required'),
});

type CreateStadiumInput = TypeOf<typeof createStadiumSchema>;

const CreateStadiumForm = ({ setShowModal, showModal }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [stadiumImageUrls, setStadiumImageUrls] = useState<string[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateStadiumInput>({
    resolver: zodResolver(createStadiumSchema),
  });
  async function onSubmit(values: CreateStadiumInput) {
    try {
      const { data } = await axiosInstance.post('/v1/Stadium', {
        ...values,
        lat,
        lon,
        startTime,
        endTime,
        stadiumImageUrls,
      });
      console.log(data);
      dispatch(setUserStadiumId(data));
      setShowModal(false);
    } catch (error: any) {
      console.log(error);
      setRegisterError(error.response?.data?.message);
      dispatch(resetStadiumId());
    }
  }
  //const imagesListRef = ref(storage, 'images/');
  const uploadFile = (imageUpload: FileList | null) => {
    if (imageUpload == null) return;
    for (var i = 0; i < imageUpload.length; i++) {
      const file = imageUpload.item(i);
      const imageRef = ref(storage, `images/${file?.name + v4()}`);
      uploadBytes(imageRef, file!).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setStadiumImageUrls((prev) => [...prev, url]);
        });
      });
    }
  };
  //   useEffect(() => {
  //     listAll(imagesListRef).then((response) => {
  //       response.items.forEach((item) => {
  //         getDownloadURL(item).then((url) => {
  //           setStadiumImageUrls((prev) => [...prev, url]);
  //         });
  //       });
  //     });
  //   }, []);
  return (
    <div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center w-full">
                    Create New Stadium
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form className="w-screen" onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative flex-auto">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          {...register('name')}
                          id="name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <p className="text-red-500 text-xs italic">
                          {errors.name?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            {...register('description')}
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="description"
                          ></textarea>
                          <p className="text-red-500 text-xs italic">
                            {errors.description?.message}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          {...register('address')}
                          id="address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <p className="text-red-500 text-xs italic">
                          {errors.address?.message}
                        </p>
                      </div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="startTime"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Start Time
                          </label>
                          <input
                            onChange={(e) => setStartTime(e.target.value)}
                            type="time"
                            id="startTime"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="endTime"
                            className="block text-sm font-medium text-gray-700"
                          >
                            End Time
                          </label>
                          <input
                            type="time"
                            name="endTime"
                            onChange={(e) => setEndTime(e.target.value)}
                            id="endTime"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <MdOutlineAddPhotoAlternate className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  multiple
                                  onChange={(event) => {
                                    console.log(event);
                                    uploadFile(event.target.files);
                                  }}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default CreateStadiumForm;
