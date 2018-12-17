document.addEventListener("DOMContentLoaded", function (event) {

    // początek interakcji z użytkownikiem, sprawdzanie czy to jest nowy user, jesli tak to wyswietla okno do wpisania swojego imienia, jesli nie to wyswietla glowny widok aplikacji

   // localStorage.clear();  //<----odkomentować, jeśli chcesz usunąć zapamiętane dane

    var button = document.querySelector("button");
    var input = document.querySelector("input");

    var welcome = document.getElementById("welcome");
    var widgets = document.getElementById("widgets");
    var plan = document.getElementById("plan");
    var addPlanView = document.getElementById("addPlan");

    var placeName = document.querySelector(".menu li");
    localStorage.getItem("name");
    console.log(localStorage.getItem("name"));

    if (localStorage.getItem("name") === null) {

        button.addEventListener("click", function (event) {

            if (input.value === "" || input.value.length < 2) {
                console.log("Podane imię jest za krótkie");  // to docelowo ma być komunikat wyświetlany na stronie, nie w konsoli
            } else {
                localStorage.setItem("name", input.value);
                console.log("Dodano imię"); //to też tylko info dla nas, potem można usunąć
                placeName.innerHTML = localStorage.getItem("name");
                welcome.classList.add("hidden");
                widgets.classList.remove("hidden");
                plan.classList.remove("hidden");
            }
            input.value = "";
        })

    } else {
        welcome.classList.add("hidden");
        widgets.classList.remove("hidden");
        plan.classList.remove("hidden");
    }
    console.log(localStorage);
    placeName.innerHTML = localStorage.getItem("name");

    //USTAWIANIE I ZMIENIANIE NUMERU TYGODNIA----------------------------------------------------------//


    Date.prototype.getWeekNumber = function () {
        var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        var dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    };

    var weekNumber = new Date().getWeekNumber();

    var puttingWeekNumber = document.createElement("span");
    puttingWeekNumber.innerHTML = weekNumber;
    document.getElementById("here").appendChild(puttingWeekNumber);

    var nextAndPrev = document.querySelectorAll(".prev_next a");

    nextAndPrev[0].addEventListener("click", function (event) {   // poprzedni
        if (weekNumber < 1) {
            weekNumber = 52;
        }

        puttingWeekNumber.innerHTML = --weekNumber;

    });
    nextAndPrev[1].addEventListener("click", function (event) {   // następny
        if (weekNumber > 52) {
            weekNumber = 1;
        }

        puttingWeekNumber.innerHTML = ++weekNumber;

    });

    // ---------------------------------------------------------------------------------------------------------
    // DODAWANIE PRZEPISU

    var addRecipe = document.querySelector('div.add:first-of-type');
    var form = document.querySelector('form.recipe');
    var saveRecipe = document.querySelector('.recipe [type=submit]');
    var formErrorMessages = document.querySelector('#formErrorMessages');

    var recipeName = document.querySelector('#recipeName');
    var recipeDesc = document.querySelector('#recipeDesc');

    var recipeInstructionsInput = document.querySelector('#recipeInstructionsInput');
    var recipeInstructionAdd = document.querySelector('#recipeInstructionAdd');
    var recipeInstructions = document.querySelector('#recipeInstructions');

    var recipeIngredientsInput = document.querySelector('#recipeIngredientsInput');
    var recipeIngredients = document.querySelector('#recipeIngredients');
    var recipeIngredientAdd = document.querySelector('#recipeIngredientAdd');

    var editInstructions = document.querySelectorAll('#recipeInstructions .fa-edit');
    var editIngredients = document.querySelectorAll('#recipeIngredients .fa-edit');
    var remove = document.querySelectorAll('.fa-trash-alt');

    addRecipe.addEventListener('click', function () {
        form.classList.remove('hidden');
        widgets.classList.add("hidden");
        plan.classList.add("hidden");
    });


    var isEdit = false;
    var index = null;
    editInstructions.forEach(function (el, i) {
        el.addEventListener('click', function () {
            // wymusza dokonczenie edycji
            editInstructions.forEach(function (el) {
               el.classList.add('hidden');
            });
            editIngredients.forEach(function (el) {
               el.classList.add('hidden');
            });
            remove.forEach(function (el) {
                el.classList.add('hidden');
            });
            recipeIngredientAdd.classList.add('hidden');
            this.parentElement.style.color = '#FFB03B';
            //koniec wymuszania dokonczenia edycji

            isEdit = true;
            index = i;
            var item = this.parentElement;
            recipeInstructionsInput.value = item.innerText;
        });
    });
    editIngredients.forEach(function (el, i) {
        // wymusza dokonczenie edycji
        editInstructions.forEach(function (el) {
            el.classList.add('hidden');
        });
        editIngredients.forEach(function (el) {
            el.classList.add('hidden');
        });
        remove.forEach(function (el) {
            el.classList.add('hidden');
        });
        recipeInstructionAdd.classList.add('hidden');
        this.parentElement.style.color = '#FFB03B';
        //koniec wymuszania dokonczenia edycji

        el.addEventListener('click', function () {
            isEdit = true;
            index = i;
            var item = this.parentElement;
            recipeIngredientsInput.value = item.innerText;
        });
    });

    remove.forEach(function (el) {
        el.addEventListener('click', function () {
            var item = this.parentElement;
            item.parentElement.removeChild(item);
        });
    });

    // funkcja edytujaca i dodajaca element do list
    function addItem(input, list) {
        var edit = document.createElement('i');
        var removeTemp = document.createElement('i');
        edit.classList.add('fas');
        edit.classList.add('fa-edit');
        removeTemp.classList.add('far');
        removeTemp.classList.add('fa-trash-alt');

        if (isEdit) {
            var item = list.querySelectorAll('li')[index];
            item.innerText = input.value;
            item.appendChild(edit);
            item.appendChild(removeTemp);
            isEdit = false;
            index = null;
        } else {
            var newItem = document.createElement('li');
            newItem.innerText = input.value;
            newItem.appendChild(edit);
            newItem.appendChild(removeTemp);
            list.appendChild(newItem);
        }

        // zeby wszystko mialo edit (te nowe tez)
        editInstructions = document.querySelectorAll('#recipeInstructions .fa-edit');
        editInstructions.forEach(function (el, i) {
            // wymusza dokonczenie edycji
            el.classList.remove('hidden');
            el.parentElement.style.color = '#4a4a49';
            //koniec wymuszania dokonczenia edycji
            el.addEventListener('click', function () {
                // wymusza dokonczenie edycji
                editInstructions.forEach(function (el) {
                    el.classList.add('hidden');
                });
                editIngredients.forEach(function (el) {
                    el.classList.add('hidden');
                });
                remove.forEach(function (el) {
                    el.classList.add('hidden');
                });
                recipeIngredientAdd.classList.add('hidden');
                this.parentElement.style.color = '#FFB03B';
                //koniec wymuszania dokonczenia edycji

                isEdit = true;
                index = i;
                var item = this.parentElement;
                recipeInstructionsInput.value = item.innerText;
            });
        });
        editIngredients = document.querySelectorAll('#recipeIngredients .fa-edit');
        editIngredients.forEach(function (el, i) {
            // wymusza dokonczenie edycji
            el.classList.remove('hidden');
            el.parentElement.style.color = '#4a4a49';
            //koniec wymuszania dokonczenia edycji
            el.addEventListener('click', function () {
                // wymusza dokonczenie edycji
                editInstructions.forEach(function (el) {
                    el.classList.add('hidden');
                });
                editIngredients.forEach(function (el) {
                    el.classList.add('hidden');
                });
                remove.forEach(function (el) {
                    el.classList.add('hidden');
                });
                recipeInstructionAdd.classList.add('hidden');
                this.parentElement.style.color = '#FFB03B';
                //koniec wymuszania dokonczenia edycji

                isEdit = true;
                index = i;
                var item = this.parentElement;
                recipeIngredientsInput.value = item.innerText;
            });
        });

        // zeby wszystko mialo remove (te nowe tez)
        remove = document.querySelectorAll('.fa-trash-alt');
        remove.forEach(function (el) {
            // wymusza dokonczenie edycji
            el.classList.remove('hidden');
            el.parentElement.style.color = '#4a4a49';
            //koniec wymuszania dokonczenia edycji

            el.addEventListener('click', function () {
                var item = this.parentElement;
                item.parentElement.removeChild(item);
            });
        });

        // wymusza dokonczenie edycji
        recipeInstructionAdd.classList.remove('hidden');
        recipeIngredientAdd.classList.remove('hidden');
        //koniec wymuszania dokonczenia edycji

        input.value = '';
    }

    // dodanie inputow do odpowiadajacych im list
    recipeInstructionAdd.addEventListener('click', function (e) {
        if (recipeInstructionsInput.value.length < 3 || recipeInstructionsInput.length > 150) {
            e.preventDefault();
            formErrorMessages.innerText = "Każdy krok instrukcji musi mieć od 3 do 150 znaków";
            formErrorMessages.style.display = 'block';
        } else {
            addItem(recipeInstructionsInput, recipeInstructions);
            formErrorMessages.style.display = 'none';
        }
    });
    recipeIngredientAdd.addEventListener('click', function (e) {
        if (recipeIngredientsInput.value.length < 3 || recipeIngredientsInput.length > 50) {
            e.preventDefault();
            formErrorMessages.innerText = "Każdy składnik musi mieć od 3 do 50 znaków";
            formErrorMessages.style.display = 'block';
        } else {
            formErrorMessages.style.display = 'none';
            addItem(recipeIngredientsInput, recipeIngredients);
        }
    });


    /*  PRZEPIS
Ten plik zawiera implementację obiektu reprezentującego przepis, jego medoty oraz pola obiektu. Na końcu sposób użycia, polacam odpalić konsolę ;p

Recipe(id,title,description)
    id           - int, identyfikator przepisu
    title        - string, nazwa przepisu
    description  - string, opis przepisu
    ingredients  - array, składniki przepisu
    instructions - array, instrukcje przepisu
*/

    function Recipe(id, title, description) {
        this.id = id; // id przepisu
        this.title = title; // nazwa przepisu
        this.description = description; // opis przepisu
        this.ingredients = []; // składniki przepisu
        this.instructions = []; // instrukcje przepisu
    }


// przygotowanie globalnej zmiennej przechowującej wszystkie przepisy

    var allRecipes = [];
    // var arrRecipeTitle = [];
    // var arrRecipeDescription = [];
    // var arrRecipeInstructions = [];
    // var arrRecipeIngredients = [];

    function saveRecipeLocal() {
        var recipeInsArr = recipeInstructions.querySelectorAll('li');
        var recipeIngArr = recipeIngredients.querySelectorAll('li');

        var newRecipe = new Recipe(allRecipes.length + 1, recipeName.value, recipeDesc.value);
        allRecipes.push(newRecipe);

        recipeInsArr.forEach(function (el) {
            newRecipe.instructions.push(el.innerText);
        });
        recipeIngArr.forEach(function (el) {
            newRecipe.ingredients.push(el.innerText);
        });

        // arrRecipeTitle.push(newRecipe.title);
        // var title = 'recipeTitle'.concat(newRecipe.id.toString());
        // console.log(title);
        // localStorage.setItem(title, arrRecipeTitle.join());
        // arrRecipeTitle.forEach(function (el, i) {
        //     console.log(i, el);
        // });
        if (!localStorage.getItem("recipeTitle")) {
            localStorage.setItem("recipeTitle", newRecipe.title);
            localStorage.setItem("recipeTitle", newRecipe.title);
        } else {
            var titleArr = localStorage.getItem("recipeTitle").split(" ,");
            titleArr.push(newRecipe.title);
            localStorage.setItem("recipeTitle", titleArr.join());
        }

        // arrRecipeDescription.push(newRecipe.description);
        // // var description = 'recipeDescription' + newRecipe.id;
        // var description = 'recipeDescription'.concat(newRecipe.id.toString());
        // localStorage.setItem(description, arrRecipeDescription.join());
        // arrRecipeDescription.forEach(function (el, i) {
        //     console.log(i, el);
        // });
        if (!localStorage.getItem("recipeDescription")) {
            localStorage.setItem("recipeDescription", newRecipe.description);
        } else {
            var descArr = localStorage.getItem("recipeDescription").split(" ,");
            descArr.push(newRecipe.description);
            localStorage.setItem("recipeDescription", descArr.join());
        }

        // arrRecipeInstructions.push(newRecipe.instructions);
        // // var instructions = 'recipeInstructions' + newRecipe.id;
        // var instructions = 'recipeInstructions'.concat(newRecipe.id.toString());
        // localStorage.setItem(instructions, arrRecipeInstructions.join());
        // arrRecipeInstructions.forEach(function (el, i) {
        //     console.log(i, el);
        // });
        if (!localStorage.getItem("recipeInstructions")) {
            localStorage.setItem("recipeInstructions", newRecipe.instructions);
        } else {
            var instArr = localStorage.getItem("recipeInstructions").split(" ,");
            instArr.push(newRecipe.instructions);
            localStorage.setItem("recipeInstructions", instArr.join());
        }

        // arrRecipeIngredients.push(newRecipe.ingredients);
        // // var ingredients = 'recipeIngredients' + newRecipe.id;
        // var ingredients = 'recipeIngredients'.concat(newRecipe.id.toString());
        // localStorage.setItem(ingredients, arrRecipeIngredients.join());
        // arrRecipeIngredients.forEach(function (el, i) {
        //     console.log(i, el);
        // });
        if (!localStorage.getItem("recipeIngredients")) {
            localStorage.setItem("recipeIngredients", newRecipe.ingredients);
        } else {
            var ingArr = localStorage.getItem("recipeIngredients").split(" ,");
            ingArr.push(newRecipe.ingredients);
            localStorage.setItem("recipeIngredients", ingArr.join());
        }
    }


    saveRecipe.addEventListener('click', function (e) {
        if (recipeName.value.length > 50 || recipeName.value.length < 3) {
            e.preventDefault();
            formErrorMessages.innerText = "Nazwa przepisu musi mieć od 3 do 50 znaków";
            formErrorMessages.style.display = 'block';
        } else if (recipeDesc.value.length > 360 || recipeDesc.value.length < 10) {
            e.preventDefault();
            formErrorMessages.innerText = "Opis musi mieć od 10 do 360 znaków";
            formErrorMessages.style.display = 'block';
        } else {
            saveRecipeLocal();
            formErrorMessages.style.display = 'none';
        }
    });

    // localStorage.clear();
    // <------------------------------------------------DODAWANIE PLANÓW---------------------------------->

    var addPlan = document.getElementById("addingPlan");
    var addPlanSubmit = document.getElementById("addPlanSubmit");
    var planName = document.getElementById("planName");
    var planDescription = document.getElementById("planDescription");
    var planNumber = document.getElementById("planNumber");
    var errorMessageContainer = document.getElementById("errorMessageContainer");
    var select = document.querySelectorAll("select");

    //var arrSavedPlanName = [];



    addPlan.addEventListener('click', function () {
        widgets.classList.add("hidden");
        plan.classList.add("hidden");
        addPlanView.classList.remove("hidden");


        addPlanSubmit.addEventListener("click", function (e) {

            console.log("click");
            var checkPlanName = planName.value;
            var checkPlanDescription = planDescription.value;
            var checkPlanNumber = planNumber.value;

            var error = false;
            var errorMessages = [];

            if (checkPlanName.length > 50) {
                error = true;
                errorMessages.push("długość nazwy nie może przekroczyć 50 znaków");
            }
            if (checkPlanName.length === 0) {
                error = true;
                errorMessages.push("pole 'Nazwa planu' jest wymagane");
            }

            if (checkPlanDescription.length > 360 || checkPlanDescription.length === 0) {
                error = true;
                errorMessages.push("długość opisu nie może przekroczyć 360 znaków i nie może być pusty");
            }
            if (isNaN(checkPlanNumber) === true) {
                error = true;
                errorMessages.push("numer tygodnia musi być liczbą");
            }

            if (checkPlanNumber <= 0 || checkPlanNumber > 52) {
                error = true;
                errorMessages.push("numer tygodnia musi być liczbą pomiędzy 1 a 52");
                console.log(checkPlanNumber);
            }


            if (error) {
                e.preventDefault();
                errorMessageContainer.innerHTML = null;
                errorMessageContainer.classList.remove("hidden");

                errorMessages.forEach(function (message) {
                    var p = document.createElement("p");
                    p.innerText = "Wymaga poprawy: " + message;
                    errorMessageContainer.appendChild(p);
                })

            } else {

                /*var przepis = {
                    id: "",
                    nrTygodnia: "",
                    nazwa: "",
                    opis: "",

                };

                przepis.id = planName.value;
                przepis.nrTygodnia = planNumber.value;
                przepis.nazwa = planName.value;
                przepis.opis = planDescription.value;

                var przepisy =[];

                //var storedNames = [];
                if ( localStorage.getItem("przepisy") != null) {
                    przepisy = localStorage.getItem("przepisy");
                    przepisy.push(JSON.stringify(przepis));
                    localStorage.setItem("przepisy", przepisy);
                }else {
                    przepisy.push(JSON.stringify(przepis));
                    localStorage.setItem("przepisy", przepisy);
                }*/


                var storedNames = [];
                if ( localStorage.getItem("planName") != null) {
                    storedNames = localStorage.getItem("planName").split(",");
                    storedNames.push(planName.value);
                    localStorage.setItem("planName", storedNames);
                }else {
                    storedNames.push(planName.value);
                    localStorage.setItem("planName", storedNames);
                }

                var storedPlans = [];
                if ( localStorage.getItem("planDescription") != null) {
                    storedPlans = localStorage.getItem("planDescription").split(",");
                    storedPlans.push(planDescription.value);
                    localStorage.setItem("planDescription", storedPlans);
                }else{
                    storedPlans.push(planDescription.value);
                    localStorage.setItem("planDescription", storedPlans);
                }

                var storedNumbers = [];
                if ( localStorage.getItem("planNumber") != null) {
                    storedNumbers = localStorage.getItem("planNumber").split(",");
                    storedNumbers.push(planNumber.value);
                    localStorage.setItem("planNumber", storedNumbers);
                }else{
                    storedNumbers.push(planNumber.value);
                    localStorage.setItem("planNumber", storedNumbers);
                }

                widgets.classList.remove("hidden");
                plan.classList.remove("hidden");
                addPlanView.classList.add("hidden");

            }
        });
    });
    console.log(allRecipes);
});


// select.forEach(function (e){
//     console.log(e.options.selectedIndex);  // To dorobić jak będą już gotowe przepisy
