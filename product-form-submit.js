/*
 * AJAX Submit Shopify Product Form With File Upload Field
 *
 * Copyright (c) 2021 Jitaditya Seal (jitadityaseal.developer@gmail.com)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */ 
productFormSubmit = () => {
    document.querySelectorAll('form[action="/cart/add"]') && [...document.querySelectorAll('form[action="/cart/add"]')].forEach(formElement => {
      formElement.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(formElement);
        const sectionsInResponse = ['cart-summary']; //sections to be returned in response
        formData.append('sections', sectionsInResponse);
        const addToCartButton = formElement.querySelector('[type="submit"]');
        let emptyInputs = [], invalidFiles = []; 
        //check for required inputs with no values
        formElement.querySelectorAll('[required]') && [...formElement.querySelectorAll('[required]')].forEach(inputElement => {
          if(!inputElement.value) emptyInputs.push(inputElement.getAttribute('name').replace('properties[','').replace(']','').trim());
        });
        if(emptyInputs.length > 0){
          emptyInputs.length > 1 ? alert('"'+emptyInputs.join(', ')+'" fields are required') : alert('"'+emptyInputs[0]+'" field is required');
          return false;
        }
        //check for invalid file formats
        formElement.querySelectorAll('input[type="file"]') && [...formElement.querySelectorAll('input[type="file"]')].forEach(inputElement => {
          const validFormats = inputElement.getAttribute('accept') ? inputElement.getAttribute('accept').toLowerCase().replace(/(\s+),(\s+)/g, ',').split(',') : false;
          if(inputElement.files.length > 0 && validFormats.length > 0){
            const type = inputElement.files[0].type, ext = '.'+inputElement.files[0].name.split('.')[inputElement.files[0].name.split('.').length - 1];
            if(validFormats.indexOf(type) === -1 && validFormats.indexOf(ext) === -1 && validFormats.filter(format => { return format.split('/')[0].trim() == type.split('/')[0].trim() && format.split('/')[1].trim() == '*' }).length === 0) invalidFiles.push(inputElement.getAttribute('name').replace('properties[','').replace(']','').trim());
          }
        });
        if(invalidFiles.length > 0){
          invalidFiles.length > 1 ? alert('File formats for "'+invalidFiles.join(', ')+'" fields are invalid') : alert('File format for "'+invalidFiles[0]+'" field is invalid');
          return false;
        }
        sectionsInResponse.forEach(section => { document.querySelector('#shopify-section-'+section) && document.querySelector('#shopify-section-'+section).remove(); });
        addToCartButton.setAttribute('disabled', true);
        //use fetch to send post data
        fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        })
        .then((response) => response.json())
        .then((data) => {
          //check for sections data
          if(!data.sections){
            console.log('no sections found in response...');
          } else {
            for (const key in data.sections) {
              if (data.sections.hasOwnProperty(key)) {
                //insert section html
                document.body.insertAdjacentHTML('beforeend', data.sections[key]);
                //show section
                document.querySelector('#shopify-section-'+key).classList.add('active');
              }
            }	
          }
        })
        .catch((e) => {
           console.error(e);
        })
        .finally(() => {
           //enable add to cart button
           addToCartButton.removeAttribute('disabled');         
        });
      });
    });
  }
  productFormSubmit();