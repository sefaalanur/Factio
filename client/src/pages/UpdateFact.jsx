import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { Alert, Button, FileInput, TextInput } from 'flowbite-react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';

export default function UpdateFact() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { factId } = useParams();
  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        try {
          const fetchFact = async () => {
            const res = await fetch(`/api/fact/getfacts?factId=${factId}`);
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
              setPublishError(data.message);
              return;
            }
            if (res.ok) {
              setPublishError(null);
              setFormData(data.facts[0]);
            }
          };
          fetchFact();
        } catch (error) {
          console.log(error.message);
        }
      }, [factId]);

      const handleUploadImage = async () => {
        try {
          if (!file) {
            setImageUploadError('Please select an image');
            return;
          }
          setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime() + '-' + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
              setImageUploadError('Image upload failed');
              setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress(null);
                setImageUploadError(null);
                setFormData({ ...formData, image: downloadURL });
              });
            }
          );
        } catch (error) {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
          console.log(error);
        }
      };
  console.log('fact id: '+ factId);
  console.log('form data id: '+ formData._id);
  console.log('current user id: ' + currentUser._id);
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`/api/fact/updatefact/${factId}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
          if (res.ok) {
            setPublishError(null);
            navigate(`/fact/${data.slug}`);
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

      return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update fact</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*'  onChange={(e) => setFile(e.target.files[0])}/>
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
           {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )
        }
        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='Write something...'
          className='h-36 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='greenToBlue'>
          Update fact
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}