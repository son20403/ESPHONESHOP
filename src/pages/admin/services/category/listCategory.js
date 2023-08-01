import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
$(document).ready(function () {
  const categoryService = new CategoryServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );
  try {
    const tbody = document.querySelector("#placeholder");
    let template = "";
    categoryService.findAllCategorys().then((data) => {
      for (const item in data) {
        const element = data[item];
        const { name } = element;
        template += `
            <tr>
                <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${item}</strong></td>
                <td>${name}</td>
                <td>
                    <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="editCategory.html?id=${item}"><i
                                    class="bx bx-edit-alt me-1"></i> Edit</a>
                            <a onclick="confirm('Bạn có chắc là muốn xóa ${name} không?') ? true : event.preventDefault()" class="dropdown-item" href="deleteCategory.html?id=${item}"><i
                                    class="bx bx-trash me-1"></i> Delete</a>
                        </div>
                    </div>
                </td>
            </tr>`;
      }
      tbody.innerHTML = template;
    });
  } catch (error) {
    console.log(error);
  }
});
