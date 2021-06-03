<?php
include 'bdconnect.php';
$nom = $_POST['nPrenom'];
$quartier = $_POST['nQuartier'];
$long = $_POST['nLong'];
$lat = $_POST['nLat'];

$add_query = "INSERT INTO public.quartiers(gid, nom_qtr, id_qtr, superficie, nbre_hab, id_arrond, sup_zari, sup_zarie, sup_zarim, sup_zarif, pop_vul, % pop_vul, geom)
	VALUES (31, '$quartier', 31, 0, 4555, 4, 568, 789, 45, 78, 896, 45, ST_MakePoint($long, $lat)";
    $query = pg_query($dbconn, $add_query);

    if($query){
        echo json_encode (array("statusCode"=>200));
    }else {
        echo json_encode (array("statusCode"=>201));
    }
?>