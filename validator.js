class Validator {
  constructor() {
    this._errors = [];
  }

  get Errors() {
    return this._errors;
  }

  /**
   *
   * @param schema
   * @param dataToValidate
   * @returns {boolean}
   */
  isValid(schema = {}, dataToValidate) {
    switch (schema.type) {
      case 'string': 
         return this.isValidSting(schema, dataToValidate);
      case 'number':
        return this.isValidNumbers(schema, dataToValidate);
      case 'boolean': 
        return this.isValidBoolean(schema, dataToValidate);
      case 'array' : 
        return this.isValidArray(schema, dataToValidate);
      case 'object':
        return this.isValidObject(schema, dataToValidate);
        
    } 

    if(schema.oneOf) {
      return this.isValidOneOf(schema, dataToValidate);
    }

    this._errors.push('Unknown type')
    return false

  } // --- ./isValid


  isValidOneOf(schema = {}, dataToValidate) {
   
    return true;

  }

  isValidSting(schema = {}, dataToValidate) {

    if (dataToValidate.length > schema.maxLength) {
      this._errors.push('Too long string');
      return false;
    }

    if(dataToValidate.length < schema.minLength) {
      this._errors.push('Too short string');
      return false;
    }

    if (typeof dataToValidate !== 'string') {
      this._errors.push('Type is incorrect');
      return false;
    }

    if(schema.enum){
      let res = schema.enum.includes(dataToValidate);
      if(!res) {
        this._errors.push('The enum does not support value');
        return false;
      }
      
    }
    if(schema.pattern) {
      let res = schema.pattern.exec(dataToValidate);
      if(!res) {
        this._errors.push('String does not match pattern');
        return false;
      }
    }


    if(schema.format == 'email') {
      let res = dataToValidate.includes('@');
      if(!res) {
        return false;
      }
    }
    
    if(schema.format == 'date') {
      let res = Date.parse(dataToValidate);
      if(!res) {
        this._errors.push('Format of string is not valid');
        return false;
      }
    }
      return true;
  } // ./isValideString

  isValidNumbers(schema = {}, dataToValidate) {

    if(dataToValidate === null && schema.nullable === true) {
      return true;
    }
    
    
    if(dataToValidate === null && schema.nullable === false) {
      this._errors.push('Value is null, but nullable false');
      return false
    }

   if(typeof dataToValidate !== 'number') {
    this._errors.push('Type is incorrect');
    return false
   }
   

   if(dataToValidate < schema.minimum) {
    this._errors.push('Value is less than it can be');
    return false;
  }

  if(dataToValidate > schema.maximum) {
    this._errors.push('Value is greater than it can be');
    return false;
  }

  if(schema.enum) {
    let res = schema.enum.includes(dataToValidate);
    if(!res) {
      this._errors.push('The enum does not support value');
      return false
    }
  }

      return true;
    

  } // ./isValideNumbers


  isValidBoolean(schema = {}, dataToValidate) {
    
    if(typeof dataToValidate !== 'boolean' && dataToValidate !== null) {
      
      this._errors.push('Type is incorrect');
      return false;
    }
    return true;

  }// ./isValideBoolean

  isValidArray(schema = {}, dataToValidate) {
    

    if(schema.nullable === true && dataToValidate === null) {
      return true;
    }
    

    if(!Array.isArray(dataToValidate) && dataToValidate !== null) {
      
      this._errors.push('Type is incorrect');
      return false;
    }

    

    if(dataToValidate.length > schema.maxItems){
      

      this._errors.push('Items count more than can be');
      return false
    }

    if(dataToValidate.length < schema.minItems){
      this._errors.push('Items count less than can be');
      return false
    }

    // if(schema.items) {
    //   if(Array.isArray(schema.items)){

    //     })
    //   } 
    // }

    // this._errors.push('Type is incorrect');
    //       return false;
        
    

    if(schema.contains) {
      if(!dataToValidate.includes(schema.contains)){
        this._errors.push('Must contain a value, but does not')
        return false;
      }
    }

    
    
    return true;
  } // ./isValidArray


  isValidObject(schema = {}, dataToValidate) {
    
    if(schema.nullable === true && dataToValidate === null) {
      return true;
    }

    

    
    // if(Array.isArray(dataToValidate)) {
    //   this._errors.push('Type is incorrect')
    //   return false;
    // }

    

    
    if(schema.maxProperties){
      if(Object.keys(dataToValidate).length > schema.maxProperties){
        
        this._errors.push('Too many properties in object')
        return false;
      } 
    }


    if(schema.minProperties){
      if(Object.keys(dataToValidate).length < schema.minProperties){
        
        this._errors.push('Too few properties in object');
        return false;
      }
    }

    return true;


    

    
  } // ./isValidObject

}




