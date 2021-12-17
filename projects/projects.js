import '../style.css'

let tableHtml = `<table class="table table-striped table-responsive">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Project Name</th>
    <th scope="col">Description</th>
    <th scope="col">Language</th>
    <th scope="col">Last Updated</th>
  </tr>
</thead>
<tbody id="repoData">
`

console.log('here')
// GETTING PERSONAL REPOS
const repoRequest = await fetch('http://localhost:3001/api/repos')

const repoInformation = await repoRequest.json();
console.log(repoInformation)
let counter = 1;
for (const repo of repoInformation.data) {
    if (repo.topics.includes('sisooyin') || repo.name === 'meet') {

        tableHtml += `<tr>
        <th scope="row">${counter}</th>
        <td><a href=${repo.html_url}>${repo.name}<a/></td>
        <td>${repo.description}</td>
        <td>${repo.language}</td>
        <td>${new Date(repo.updated_at).toLocaleDateString()}</td>
      </tr>`
        counter++;
    }
}


tableHtml += `</tbody>
</table>`
document.querySelector('#main').innerHTML = tableHtml;