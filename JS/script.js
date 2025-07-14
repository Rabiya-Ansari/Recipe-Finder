// Footer date fetch 
$(document).ready(function() {
  $("#current-year").text(new Date().getFullYear());
});

// Recipie Finder logic
document.getElementById('recipeForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const ingredient1 = document.getElementById('ingredient1').value;
            const ingredient2 = document.getElementById('ingredient2').value;
            const ingredient3 = document.getElementById('ingredient3').value;
            
            document.getElementById('loading').classList.remove('hidden');
            document.getElementById('results').classList.add('hidden');
            document.getElementById('error').classList.add('hidden');
            
            try {
                
                const recipes = await generateRecipes([ingredient1, ingredient2, ingredient3]);
                
                displayRecipes(recipes);
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('results').classList.remove('hidden');
            } catch (error) {
                console.error(error);
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('error').classList.remove('hidden');
            }
        });

        async function generateRecipes(ingredients) {
        
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            return [
                {
                    name: `Creamy ${ingredients[0]} and ${ingredients[1]} Pasta`,
                    description: `A delicious pasta dish combining ${ingredients[0]}, ${ingredients[1]}, and ${ingredients[2]} for a creamy, satisfying meal.`,
                    ingredients: [`200g pasta`, `1 cup ${ingredients[0]}`, `1/2 cup ${ingredients[1]}`, `1/4 cup ${ingredients[2]}`, `2 cloves garlic`, `Salt and pepper to taste`],
                    instructions: [
                        "Cook pasta according to package instructions.",
                        `In a pan, sauté garlic, then add ${ingredients[0]} and ${ingredients[1]}.`,
                        `Mix in ${ingredients[2]} and season well.`,
                        "Combine with cooked pasta and serve hot."
                    ],
                    prepTime: "10 mins",
                    cookTime: "15 mins"
                },
                {
                    name: `${ingredients[0]} and ${ingredients[1]} Salad with ${ingredients[2]} Dressing`,
                    description: `A fresh and healthy salad featuring ${ingredients[0]} and ${ingredients[1]}, topped with a ${ingredients[2]}-based dressing.`,
                    ingredients: [`2 cups mixed greens`, `1 cup ${ingredients[0]}`, `1/2 cup ${ingredients[1]}`, `3 tbsp ${ingredients[2]}`, `1 tbsp olive oil`, `1 tbsp lemon juice`],
                    instructions: [
                        "Wash and dry the greens.",
                        `Chop ${ingredients[0]} and ${ingredients[1]} into bite-sized pieces.`,
                        `Whisk together ${ingredients[2]}, olive oil and lemon juice for dressing.`,
                        "Toss all ingredients together and serve."
                    ],
                    prepTime: "15 mins",
                    cookTime: "0 mins"
                },
                {
                    name: `Quick ${ingredients[0]} ${ingredients[1]} Stir Fry with ${ingredients[2]}`,
                    description: `An easy weeknight stir fry combining ${ingredients[0]}, ${ingredients[1]}, and ${ingredients[2]} for a flavorful dish.`,
                    ingredients: [`300g ${ingredients[0]}`, `100g ${ingredients[1]}`, `2 tbsp ${ingredients[2]}`, `1 onion`, `2 cloves garlic`, `1 tbsp soy sauce`],
                    instructions: [
                        `Chop ${ingredients[0]} and ${ingredients[1]} into uniform pieces.`,
                        "Sauté onion and garlic until fragrant.",
                        `Add ${ingredients[0]} and ${ingredients[1]}, stir fry for 5 minutes.`,
                        `Add ${ingredients[2]} and soy sauce, cook for another 2 minutes.`,
                        "Serve hot with rice."
                    ],
                    prepTime: "10 mins",
                    cookTime: "10 mins"
                }
            ];
        }

        function displayRecipes(recipes) {
            const container = document.getElementById('recipeContainer');
            container.innerHTML = '';
            
            recipes.forEach(recipe => {
                const recipeEl = document.createElement('div');
                recipeEl.className = 'recipe-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300';
                recipeEl.innerHTML = `
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">${recipe.name}</h3>
                        <p class="text-gray-600 mb-4">${recipe.description}</p>
                        
                        <div class="mb-4">
                            <h4 class="font-medium text-gray-700 mb-1">Ingredients:</h4>
                            <ul class="text-sm text-gray-600 list-disc pl-5">
                                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-medium text-gray-700 mb-1">Instructions:</h4>
                            <ol class="text-sm text-gray-600 list-decimal pl-5">
                                ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                        
                        <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                            <span>Prep: ${recipe.prepTime}</span>
                            <span>Cook: ${recipe.cookTime}</span>
                        </div>
                    </div>
                `;
                container.appendChild(recipeEl);
            });
        }



