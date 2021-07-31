<?php
  //Connexion a la base donnees
  // $server = 'localhost';
  // $db = 'web_map_flood';
  // $user = 'postgres';
  // $password = 'gager2019';

  // $connexion = pg_connect("host=$server port=5433 dbname=$db user=$user password=$password");
     
  // $sql = 'SELECT json'

    // $sql = 'SELECT ST_AsGeoJSON(geom) FROM zari;';
    // $resultset = pg_fetch_all(pg_query($connexion, $sql));
    // echo json_encode($resultset);

    $prenom = $_GET['nPrenom'];
    $quartier = $_GET['nQuartier'];
    $long = $_GET['nLong'];
    $lat = $_GET['nLat'];

    try {
      $dbconn=new PDO("pgsql:host=localhost;dbname=web_map_flood;port=5433","postgres","gager2019") or die("Connexion impossible");
      $dbconn->exec("SET CHARACTER SET utf8");
      $dbconn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
  // S'il existe un problème de connection, on obtient le message d'erreur
  } catch(PDOException $erreur) {
      $erreur->getMessage(); // Supprimer en production
  }

  $req = "SELECT type_zari, superficie, prof_subm, quartier FROM zari WHERE ST_Intersects(geom, ST_SetSRID(ST_Point($long, $lat), 4326));";
  $resultat = $dbconn->prepare($req);
  $resultat->execute();

  while($data = $resultat->fetch(PDO::FETCH_ASSOC)){

    echo json_encode($data);
      // if(in_array('ZARIE', $data))
      //             echo"Vous etes sur une zone à risque d'inondation très élevé";
      // elseif(in_array('ZARIM', $data))
      //             echo"Vous etes sur une zone à risque d'inondation moyenne";
      // elseif(in_array('ZARIF', $data))
      //             echo"Vous etes sur une zone à risque d'inondation faible";
      // else
      //   echo"Vous n'etes pas sur une zone à risque d'inondation";
    }
?>