import * as yup from 'yup';


export const schemaLogin = yup.object().shape({
    email: yup.string().email('Email invalide').required('Email requis niiik moook'),
    password:yup.string().required('nikmook diiro')
  });

  export const schemaSignup = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup.string().email('Email invalide').required('Email requis niiik moook'),
    password:yup.string().required('nikmook diiro')
  });  
  export const schemaTache = yup.object().shape({
    title: yup.string().required('titel is required'),
    description: yup.string().required('titel is required'),
    deadline:yup.string().required('nikmook diiro')
  });  