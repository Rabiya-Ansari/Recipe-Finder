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
    const apiKey = '1f64d6f31a2e478c88c7edf23f17f45d'; 
    const ingredientString = ingredients.join(','); 
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        return data.map(recipe => ({
            name: recipe.title,
            description: `A delicious recipe featuring ${ingredients.join(', ')}.`,
            ingredients: recipe.usedIngredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`),
            instructions: ["Instructions not available from API."], 
        }));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error; 
    }
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