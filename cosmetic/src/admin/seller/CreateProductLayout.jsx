import CategoryBrandStep from "./CategoryBrandStep";
import BrandStep from "./BrandStep";
import ProductInfoStep from "./ProductInfoStep";
import AttributeSelectionStep from "./AttributeSelectionStep";
import VariantStep from "./VariantsStep";
import VariantPricingStep from "./VariantPricingStep";
import ProductFeatureStep from "./ProductFeatureStep";
import ProductSpecificationStep from "./ProductSpecificationStep";
import ProductManufactureInfoStep from "./ProductManufactureInfoStep";
import VariantImageUploadStep from "./VariantImageUploadStep";
import ImageUploadStep from "./ImageUploadStep";

export default function CreateProductLayout({ activeStep, setActiveStep }) {

  const next = () => {
    setActiveStep(activeStep + 1);
  };

  const renderStep = () => {

    switch (activeStep) {

      case 0:
        return <CategoryBrandStep onNext={next} />;

      case 1:
        return <BrandStep onNext={next} />;

      case 2:
        return <ProductInfoStep onNext={next} />;

      case 3:
        return <AttributeSelectionStep onNext={next} />;

      case 4:
        return <VariantStep onNext={next} />;

      case 5:
        return <VariantPricingStep onNext={next} />;

      case 6:
        return <ProductFeatureStep onNext={next} />;

      case 7:
        return <ProductSpecificationStep onNext={next} />;

      case 8:
        return <ProductManufactureInfoStep onNext={next} />;

      case 9:
        return <VariantImageUploadStep onNext={next} />;

      case 10:
        return <ImageUploadStep onNext={next} />;

      default:
        return <div>All Steps Completed!</div>;
    }
  };

  return (
    <div className="create-product-container">
      {renderStep()}
    </div>
  );
}