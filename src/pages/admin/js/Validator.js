function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  let selectorRules = {};

  // Ham thuc hien validate
  function validate(inputElement, rule) {
    const errorElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    let errorMessage;

    // Lấy rule của selector
    const rules = selectorRules[rule.selector];
    // Lặp qua từng rule & kiểm tra
    for (let i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
          break;

        default:
          errorMessage = rules[i](inputElement.value);
          break;
      }
      // Nếu có lỗi thì dừng việc kiểm tra
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }

    return !errorMessage;
  }
  // lay element cua form
  const formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      let isFormValid = true;

      // lặp qua từng rule và validate
      options.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector);

        const isValid = validate(inputElement, rule);

        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          const enableInputs = formElement.querySelectorAll(
            "[name]:not([disabled])"
          );
          const fileElement = formElement.querySelector('[type="file"]');

          const formValues = [...enableInputs].reduce((values, input) => {
            switch (input.type) {
              case "file":
                values[input.name] = input.files;
                break;
              case "radio":
                values[input.name] = formElement.document.querySelector(
                  `input[name="${input.name}"]:checked`
                ).value;
                break;
              case "checkbox":
                if (!input.matches(":checked")) {
                  values[input.name] = "";
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              default:
                values[input.name] = input.value;
                break;
            }
            return values;
          }, {});
          options.onSubmit(formValues);
        } else {
          formElement.submit();
        }
      }
    });

    // lặp qua mỗi rule và sử lý
    options.rules.forEach((rule) => {
      // Lưu lại các rule trong mỗi input

      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      //

      const inputElements = formElement.querySelectorAll(rule.selector);

      [...inputElements].forEach((inputElement) => {
        inputElement.addEventListener("blur", () => {
          validate(inputElement, rule);
        });
        // xử lý mỗi khi người dùng nhập
        inputElement.addEventListener("input", () => {
          const errorElement = getParent(
            inputElement,
            options.formGroupSelector
          ).querySelector(options.errorSelector);
          errorElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove(
            "invalid"
          );
        });
      });

      // if (inputElement) {
      //   // xử lý blur ra ngoài

      // }
    });
  }
}

Validator.isRequired = (selector, message) => {
  return {
    selector,
    test: (value) => {
      return value ? undefined : message || "Vui lòng nhập trường này!";
    },
  };
};

Validator.isPrice = (selector, message) => {
  return {
    selector,
    test: (value) => {
      const number = Number(value);
      return number
        ? number >= 0
          ? undefined
          : "Nhập số dương!"
        : message || "Vui lòng nhập số!";
    },
  };
};

Validator.isEmail = (selector, message) => {
  return {
    selector,
    test: (value) => {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message ||
            "Vui lòng nhập đúng định dạng Email! (VD: admin123@gmail.com)";
    },
  };
};

Validator.minLength = (selector, min = 6, message) => {
  return {
    selector,
    test: (value) => {
      return value.length >= min
        ? undefined
        : message || `Nhập tối thiểu ${min} ký tự`;
    },
  };
};

Validator.isConfirmed = (selector, getConfirmValue, message) => {
  return {
    selector,

    test: (value) => {
      return value === getConfirmValue()
        ? undefined
        : `Vui lòng nhập đúng ${message || `dữ liệu`} `;
    },
  };
};
