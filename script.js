let employes = [
    {
      id: 1,
      nom: "Alami",
      prenom: "Said",
      fonction: "Directeur",
      salaire: 13000,
    },
    {
      id: 2,
      nom: "Alaoui",
      prenom: "Mohamed",
      fonction: "Testeur",
      salaire: 13000,
    },
    {
      id: 3,
      nom: "Fakir",
      prenom: "zakariya",
      fonction: "Directeur",
      salaire: 13000,
    },
    {
      id: 4,
      nom: "Ait elmouden",
      prenom: "Brahim",
      fonction: "Testeur",
      salaire: 22000,
    },
    {
      id: 5,
      nom: "Othman",
      prenom: "Farouk",
      fonction: "Technecien",
      salaire: 14000,
    },
  ];

    let fonctions = ['Technecien','Testeur','Directeur'];
    let selectF = document.getElementById('fonction');
    let selectR = document.getElementById('fonctionR');
    document.body.onload= function (){
      fonctions.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.innerText = element;
        selectF.append(option);
      });
      fonctions.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.innerText = element;
        selectR.append(option);
      });

    };

  function employeeAsDiv(employee) {
    return `<tr>
      <td>${employee.id}</td>
      <td>${employee.nom}</td>
      <td>${employee.prenom}</td>
      <td>${employee.fonction}</td>
      <td>${employee.salaire}</td>
      <td class="center">
        <a class="edit" href="#edit">
          <span class="material-symbols-outlined orange" onclick="modifierEmploye(event)"> edit </span>
        </a>
        <a class="edit" href="#edit" onclick='supprimer(event)''>
          <span class="material-symbols-outlined red"> delete </span>
        </a>
      </td></tr>`;
  }
  
  // afficher les informations de tableau
  function updateTable() {
    let textHtml = employes.map((x) => employeeAsDiv(x)).join("");
    document.getElementById("data").innerHTML = textHtml;
  }
  updateTable();

  // suprimmer un element dans le tableau
  function supprimer(event) {
    let tr = event.target.closest("tr");
    //supprimer l'employe de la liste employes
    let idSup = Number(tr.children[0].innerText);
    let ok = confirm(`Voulez-vous supprimer l'employe num :${idSup} `);
    
    // //supprimer la ligne employe du DOM
    if (ok) {
      employes = employes.filter((emp) => emp.id != idSup);
      tr.remove();
      setTotalV2();
    }
  }

  // afficher le total
  let footer = document.createElement("tfoot");
  let table = document.getElementById("tableau");
  table.appendChild(footer);
  function setTotal() {
    let total = employes.reduce((x, y) => x + y.salaire, 0);
    footer.innerHTML = `<tr>
                        <td colspan="3"></td>
                        <td>Total</td>
                        <td>${total}</td>
                        <td></td></tr>`;
  }
  setTotalV2();


  function setTotalV2(){
    let tds = document.querySelectorAll('td:nth-child(5)');
    let total = 0;
    tds.forEach(element => {
      total += Number(element.innerText);
    });
    footer.innerHTML = `<tr>
                        <td colspan="3"></td>
                        <td>Total</td>
                        <td>${total} DH</td>
                        <td></td></tr>`;
  }

  // afficher la formulaire d'ajoute un employe
  function addEmploye() {
    document.getElementById('ajout').style.display = 'block';
    document.getElementById('tableform').style.display = 'none';
  }

  // ajoute un employe
  function submitEmploye(){
    let id = employes.length + 1;
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    
    let fonction = document.getElementById('fonction').value;
    fonction = document.getElementById('fonction').value == -1 ? '':fonction;
    let salaire = Number(document.getElementById('salaire').value);
    employes.push({
      id: id,
      nom: nom,
      prenom: prenom,
      fonction: fonction,
      salaire: salaire,
    });
    updateTable()
    setTotal();
    document.getElementById('ajout').style.display = 'none';
    document.getElementById('tableform').style.display = 'block';
  }


  // pour modifier un employe
  function modifierEmploye(event){
    document.getElementById('modifier').style.display='block';
    let tr = event.target.closest('tr');
    let idM = Number(tr.children[0].innerText);
    let empSelected = employes.find(x => x.id == idM);
    document.getElementById('id2').value = empSelected.id;
    document.getElementById('nom2').value = empSelected.nom;
    document.getElementById('prenom2').value = empSelected.prenom;
    document.getElementById('fonction2').value = empSelected.fonction;
    document.getElementById('salaire').value = empSelected.salaire;
    document.getElementById('tableform').style.display = 'none';
    
  }

  function indexOfEmploye(id){
    return employes.findIndex(x => x.id == id)
  }

  // affecter la modification
  function affecterModification(){
      let idM = Number(document.getElementById('id2').value);
      let nom = document.getElementById('nom2').value;
      let prenom = document.getElementById('prenom2').value;
      let fonction = document.getElementById('fonction2').value;
      let salaire = Number(document.getElementById('salaire2').value);
      let indice = employes.findIndex(x => x.id == idM);
      employes[indice] ={id:idM,nom:nom,prenom:prenom,fonction:fonction,salaire:salaire};
      updateTable()
      document.getElementById('modifier').style.display='none';
      document.getElementById('tableform').style.display = 'block';
      setTotal();
    }
  


  // fermer une formulaire
  function Fermer(){
    event.target.closest('form').style.display= 'none';
    document.getElementById('tableform').style.display = 'block';
  }



  function filtrerParFonction(){
    if (selectR.value == -1){
      updateTable();
    }else{
      let filteredEmployes = employes.filter(x => x.fonction == selectR.value);
    let textHtml = filteredEmployes.map((x) => employeeAsDiv(x)).join("");
    document.getElementById("data").innerHTML = textHtml;
    }
    setTotalV2();
  }
  selectR.addEventListener('change',filtrerParFonction)