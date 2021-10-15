## AJAX submit Shopify product form with file upload field

Follow the steps below to implement ajax submission for Shopify product form with file upload field as custom property. 

### Steps

* Create a new snippet called **file-upload-field** and paste the content of file-upload-field.liquid in it.
* Create a new asset file called **product-form-submit.js** and paste the content of product-form-submit.js in it.
* Create a new section called **cart-summary** and paste the content of cart-summary.liquid in it.
* Add `{% render 'file-upload-field', field_label: 'My file' %}` inside your product form above the submit button. **field_label** is necessary to create the field; change **My file** to appropriate field label as needed. You can use additional parameters- **accept** for accepted file formats and **required** to make the field required. For example, use `{% render 'file-upload-field', field_label: 'My file', accept: 'image/*', required: true %}` to add a mandatory image upload field.
* Disable existing ajax submission associated with product form (if any).
* Add `<script src="{{ 'product-form-submit.js' | asset_url }}" defer></script>` to your product template at the top.
* Customize the style to match your theme.

**Note:** This ajax form submission feature is intended to be used for the product page form. So, additional code modifications may be required in order to make it work for quick view or any other dynamically generated product form. 