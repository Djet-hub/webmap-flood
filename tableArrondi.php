<?php
    echo'<table class="table" border="2">';
    echo '<th>Nom Arrondissement</th><th>Nombre habitants</th><th>Superficie (m2)</th>';
    //Connexion a la base donnees
    try {
        $connexion = new PDO('pgsql:host=localhost; port=5433; dbname=web_map_flood', 'postgres', 'gager2019');
        if($connexion){
        }
    } catch (PDOException $e) {
        echo $e->getMessage(); //Sinon affiche le message d'erreur
    }
    //Interrogation de la base de donnees
    $sql = 'SELECT nom_arrond, nbre_hab, superficie FROM arrondissements;';
    $resultset = $connexion->prepare($sql);
    $resultset->execute();
    while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) {
        echo"<tr>";
        echo '<td text-align="center">'.$row['nom_arrond']."</td>";
        echo '<td text-align="center">'.$row['nbre_hab']."</td>";
        echo '<td text-align="center">'.$row['superficie']."</td>";
        echo"</tr>";
    }
    $connexion=null;
    echo '</table>';
?> 

