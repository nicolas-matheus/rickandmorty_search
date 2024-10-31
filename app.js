$(document).ready(function () {

  function renderCharacters(characters) {
    $('#character-list').empty();

    characters.forEach(character  => {
      const characterElement = $(`
        <li>
          <img src="${character.image}" alt="${character.name}">
          <span><strong>${character.name}</strong> - ${character.species}</span>
        </li>
      `);
      $('#character-list').append(characterElement);
    });
  }

  $('#todo-form').on('submit', function (e) {
    e.preventDefault();

    const characterName = $('#character-name').val().trim();
    if (characterName) {

      $.ajax({
        url: `https://rickandmortyapi.com/api/character/?name=${characterName}`,
        method: 'GET',
        success: function(response) {
          if (response.results && response.results.length > 0) {
            renderCharacters(response.results);
          } else {
            $('#character-list').html('<li>Nenhum personagem encontrado.</li>')
          }
        },
        error: function() {
          $('#character-list').html('<li>Erro. Tente novamente.</li>')
        }
      });
      $('#character-name').val('');
    }
  });
});

  