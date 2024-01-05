import * as formik from 'formik';
import * as yup from 'yup';
import FormInputs from './FormInputs';
import axios from 'axios';

interface Props{
  CreateBtnStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitAction: React.Dispatch<React.SetStateAction<(() => void)>>;
}
const CreateTodoForm:React.FC<Props> = ({CreateBtnStatus, setSubmitAction}) =>{
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    done: yup.bool().required(),
  });
  const initialValues = {
    title: '',
    content: '',
    done: false
  }

  const Submit = async (values:any)=> {
    const data = await axios.post("https://localhost:44305/api/SuperHero", values);
    // const dataJson = await data.data;
    // console.log(dataJson)
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={Submit}
      initialValues={initialValues}
      validateOnMount = {true}
    >
      { Props => <FormInputs {...Props} CreateBtnStatus={CreateBtnStatus} setSubmitAction={setSubmitAction}/>}
    </Formik>
  );
}

export default CreateTodoForm;