/**
 * useKoperasiRegistration - Public composable for cooperative registration
 */
export const useKoperasiRegistration = () => {
  const loading = ref(false)
  const step = ref(1)

  const nextStep = () => { step.value++ }
  const prevStep = () => { if (step.value > 1) step.value-- }

  return { loading, step, nextStep, prevStep }
}
