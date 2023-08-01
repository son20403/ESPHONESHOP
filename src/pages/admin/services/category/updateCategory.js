import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import UrlHelper from "../../../../helpers/UrlHelper";

$(document).ready(function () {
  const categoryService = new CategoryServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");

  const categoryIdCtrl = $(".categoryID");
  const nameCrt = $(".categoryName");

  categoryService.findByIdCategorys(id).then((data) => {
    const { name } = data;
    categoryIdCtrl.val(id);
    nameCrt.val(name);
  });

  Validator({
    form: "#form-editCategory",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [Validator.isRequired(".categoryName")],
    onSubmit: (data) => {
      const { categoryName } = data;
      editCategory(categoryName);
    },
  });

  function editCategory(categoryName) {
    const cate = new Category(null, categoryName);
    try {
      categoryService
        .updateCategory(categoryIdCtrl.val(), cate)
        .then((data) => {
          showSuccessToast();
          setTimeout(() => {
            location.href =
              "../../../admin/function/Category/listCategory.html";
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  }
});
