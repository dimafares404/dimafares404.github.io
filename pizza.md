<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pizza Ordering Form</title>
  </head>
  <body>
    <h1>Pizza Ordering Form</h1>
    <form>
      <h2>Contact Information</h2>
      <p>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
    </p>
    <p>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required>
    </p>
    <p>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </p>
      <h2>Select Pizza Size</h2>
        <p>
          <label for="size">Pizza Size:</label>
          <select id="size" name="size" required>
            <option value="">--Select Size--</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="XLarge">XLarge</option>
          </select>
        </p>
      <h2>Select Sauce</h2>
        <p>
          <input type="radio" id="marinara" name="sauce" value="Marinara" required>
          <label for="marinara">Marinara</label>
        </p>
        <p>
          <input type="radio" id="ranch" name="sauce" value="Ranch">
          <label for="ranch">Ranch</label>
        </p>
        <p>
          <input type="radio" id="nosauce" name="sauce" value="No Sauce">
          <label for="nosauce">No Sauce</label>
        </p>
<h2>Select Toppings</h2>
<p>
  <input type="checkbox" id="pepperoni" name="toppings[]" value="Pepperoni">
  <label for="pepperoni">Pepperoni</label>
  <input type="checkbox" id="sausage" name="toppings[]" value="Sausage">
  <label for="sausage">Sausage</label>
</p>
<p>
  <input type="checkbox" id="mushroom" name="toppings[]" value="Mushroom">
  <label for="mushroom">Mushroom</label>
  <input type="checkbox" id="pineapple" name="toppings[]" value="Pineapple">
  <label for="pineapple">Pineapple</label>
</p>
<p>
  <input type="checkbox" id="peppers" name="toppings[]" value="Peppers">
  <label for="peppers">Peppers</label>
  <input type="checkbox" id="onions" name="toppings[]" value="Onions">
  <label for="onions">Onions</label>
</p>
<h2>Additional Instructions</h2>     
<p>
  <textarea name="instructions" rows="4" cols="25">Add instructions</textarea>
</p>
<p>
  <button type="submit">Submit</button>
</p>
    </form>
    <table border="1">
  <caption>List of My Favorite Games</caption>
  <tr>
    <th>Developer</th>
    <th>Title</th>
    <th>Year</th>
  </tr>
  <tr>
    <td rowspan="3">Bungie</td>
    <td>Halo</td>
    <td>2001</td>
  </tr>
  <tr>
    <td>Halo 2</td>
    <td>2004</td>
  </tr>
  <tr>
    <td>Halo 3</td>
    <td>2007</td>
  </tr>
  <tr>
    <td>Mojang</td>
    <td>Minecraft</td>
    <td>2011</td>
  </tr>
  <tr>
    <td colspan="3">Count: 4</td>
  </tr>
</table>
  </body>
</html>
