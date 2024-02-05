import * as formik from 'formik';
import * as yup from 'yup';
import EditFormInput from './EditFormInput';
import axios from 'axios';
import { ITodos } from '../../Data/ITodos';

interface Props{
  todo:ITodos;
  SetEditBtnStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitAction: React.Dispatch<React.SetStateAction<(() => void)>>;
}

const EditFormFormikConfig:React.FC<Props> = ({todo, SetEditBtnStatus, setSubmitAction}) =>{
  const { Formik } = formik;

  const schema = yup.object().shape({
    id:yup.string().notRequired(),
    title: yup.string().required(),
    content: yup.string().required(),
    done: yup.bool().required(),
  });
  const initialValues = {
    id: todo.id,
    title: todo.title,
    content:todo.content,
    done: todo.done
  }

  const Submit = async (values:ITodos)=> {
    const data = await axios.put(`${process.env.REACT_APP_ENDPOINT}/${values.id}`, values);
    const dataJson = await data.data;
    console.log(dataJson);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={Submit}
      initialValues={initialValues}
      validateOnMount = {true}
    >
      { Props => <EditFormInput {...Props} SetEditBtnStatus={SetEditBtnStatus} setSubmitAction={setSubmitAction}/>}
    </Formik>
  );
}

export default EditFormFormikConfig;