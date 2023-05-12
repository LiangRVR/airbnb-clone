"use client";

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Modal from "./modal.component";
import { useRentModal } from "@/app/hooks/useModal";

import Heading from "../heading/heading.component";
import CategoryInput from "../inputs/category.input.component";
import CategoryStep from "./rent-modal-steps/category-step.component";
import LocationStep from "./rent-modal-steps/location-step.component";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: ",",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const rentStepsComponents = {
    [STEPS.CATEGORY]: (
      <CategoryStep
        setCustomValue={setCustomValue}
        categorySelected={category}
      />
    ),
    [STEPS.LOCATION]: (
      <LocationStep
        locationSelected={location}
        setCustomValue={setCustomValue}
      />
    ),
    [STEPS.INFO]: <div>INFO</div>,
    [STEPS.IMAGES]: <div>IMAGES</div>,
    [STEPS.DESCRIPTION]: <div>DESCRIPTION</div>,
    [STEPS.PRICE]: <div>PRICE</div>,
  };

  const bodyContent = rentStepsComponents[step];

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={
        step === STEPS.CATEGORY ? undefined : onBack
      }
      title="Airbnb your Home"
      body={bodyContent}
    />
  );
};

export default RentModal;
