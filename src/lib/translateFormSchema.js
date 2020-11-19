import * as yup from 'yup'

export const translateFormSchema = t =>
  yup.object().shape({
    fullName: yup.string().required(t('form.errors.name_required')),
    phone: yup.string(),
    title: yup.string().required(t('form.errors.title_required')),
    story: yup.string(),
    accepted: yup.bool().oneOf([true], t('form.errors.accept_required')),
    image: yup
      .mixed()
      .required(t('form.errors.photo_required'))
      .test(
        'fileSize',
        t('form.errors.photo_size'),
        value => value && value[0] && value[0].size <= 5 * 1000 * 1000
      ),
  })
