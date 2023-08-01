import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";

$(document).ready(function () {
  Validator({
    form: "#form-category",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [Validator.isRequired(".categoryName")],
    onSubmit: (data) => {
      const { categoryName } = data;
      addCategory(categoryName);
    },
  });

  function addCategory(categoryName) {
    const categoryIdCtrl = $(".categoryID");

    const cate = new Category(null, categoryName);
    const categoryService = new CategoryServive(
      FirebaseConstants.RealTimeDb,
      "Token"
    );
    try {
      categoryService.insertCategory(cate).then((data) => {
        showSuccessToast();
        categoryIdCtrl.val(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
});
// $(".btnInsertCategory").on("click", (e) => {
//   e.preventDefault();
//   const categoryIdCtrl = $(".categoryID");
//   const name = $(".categoryName").val();

//   const cate = new Category(null, name);
//   const categoryService = new CategoryServive(
//     FirebaseConstants.RealTimeDb,
//     "Token"
//   );
//   try {
//     categoryService.insertCategory(cate).then((data) => {
//       categoryIdCtrl.val(data);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
