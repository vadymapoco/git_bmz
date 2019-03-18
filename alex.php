<?php  /*include("include/db_connect.php");?>*/

header ('Access-Control-Allow-Origin: http://localhost:8080');
header ('Content-Type: application/json');
header ('Access-Control-Allow-Credentials: true');

//$db_host = 'localhost';


$db_host = 'soundene.mysql.tools';
$db_user = 'soundene_db';
$db_pass = 'hDhL7VjT';
$db_database = 'soundene_db';


$link = mysqli_connect($db_host, $db_user , $db_pass , $db_database);

if (!$link) {
	echo("Ошибка подключения" . mysqli_connect_error());
	exit();
}

//echo ('Соединение установлено...' . mysqli_get_host_info($link). "\n");
mysqli_query($link,"SET NAMES UTF8"); 

 /*include("include/main1.php");*/
		function clearstring($db, $t_str){
	$t_str = strip_tags($t_str);
	$t_str = mysqli_real_escape_string($db, $t_str);
	$t_str = trim($t_str);
	return $t_str;
}


	/*mysqli_query($link, "INSERT INTO `client` (`id_client`, `user_name`, `user_email`, `user_password`) VALUES (NULL, 'Den', 'denghjcgj@gmail.com', '456832');");*/


if(isset($_GET["action"])){
	$act = clearstring($link, $_GET["action"]);
	$uid = clearstring($link, $_GET["uid"]);
	if ($act == 'readuser'){
$result = mysqli_query($link, "SELECT * FROM client WHERE fire_id = '$uid'");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

echo json_encode($dbrow);
}
else {echo ('');}
}
}


if(isset($_GET["asin"])){
	$act = clearstring($link, $_GET["asin"]);
	$uid = clearstring($link, $_GET["uid"]);
	$sort = clearstring($link, $_GET["sort"]);
	if ($act == 'lookasin'){
$result = mysqli_query($link, "SELECT * FROM tovar WHERE fire_id = '$uid' ORDER BY $sort");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {echo ('нет записей');}
}
else {echo('no lookasin');}
}


if(isset($_GET["sales"])){
	$act = clearstring($link, $_GET["sales"]);
	$uid = clearstring($link, $_GET["uid"]);
	$sort = 'data';
	if ($act == 'sales'){
$result = mysqli_query($link, "SELECT * FROM tovar_history WHERE fire_id = '$uid' ORDER BY $sort");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {echo ('нет записей');}
}
else {echo('no lookasin');}
}


if(isset($_GET["lookkeyword"])){
	$act = clearstring($link, $_GET["lookkeyword"]);
	$uid = clearstring($link, $_GET["uid"]);
	$current_asin = clearstring($link, $_GET["current_asin"]);

	if ($act == 'lookkeyword'){
$result = mysqli_query($link, "SELECT * FROM keyword WHERE fire_id = '$uid' AND asin_tovar='$current_asin'");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {
	echo json_encode($dbrow);}
}
else {echo('no lookkeyword');}
}



if(isset($_GET["lookallkeyword"])){
	$act = clearstring($link, $_GET["lookallkeyword"]);
	$uid = clearstring($link, $_GET["uid"]);
	

	if ($act == 'lookallkeyword'){
$result = mysqli_query($link, "SELECT * FROM keyword WHERE fire_id = '$uid' ");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {
	echo json_encode($dbrow);}
}
else {echo('no lookkeyword');}
}


if(isset($_GET["lookasinhistory"])){
	$act = clearstring($link, $_GET["lookasinhistory"]);
	$uid = clearstring($link, $_GET["uid"]);
	$current_asin = clearstring($link, $_GET["current_asin"]);
	$sort = 'data';

	if ($act == 'lookasinhistory'){
$result = mysqli_query($link, "SELECT * FROM tovar_history WHERE fire_id = '$uid' AND asin_tovar='$current_asin' ORDER BY $sort");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {
	echo json_encode($dbrow);}
}
else {echo('no lookasinhistory');}
}


if(isset($_GET["lookkwhistory"])){
	$act = clearstring($link, $_GET["lookkwhistory"]);
	$uid = clearstring($link, $_GET["uid"]);
	$current_kw = clearstring($link, $_GET["current_keyword"]);
	$sort = 'data';
	$filter = "fire_id = '$uid' AND keyword='$current_kw'";

	if ($act == 'lookkwhistory'){
$result = mysqli_query($link, "SELECT * FROM kw_history WHERE $filter ORDER BY $sort" );

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {
	echo json_encode($dbrow);}
}
else {echo('no lookkwhistory');}
}

/* просмотр истории событий по товару */

if(isset($_GET["lookasineventhistory"])){
	$act = clearstring($link, $_GET["lookasineventhistory"]);
	$uid = clearstring($link, $_GET["uid"]);
	$current_kw = clearstring($link, $_GET["current_keyword"]);
	$current_asin = clearstring($link, $_GET["current_asin"]);
	$sort = 'start_date';
	if ($current_asin == 'none') {$filter = "fire_id = '$uid'";} else
	$filter = "fire_id = '$uid' AND asin='$current_asin'";

	if ($act == 'lookasineventhistory'){
$result = mysqli_query($link, "SELECT * FROM event_history WHERE $filter ORDER BY $sort" );

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {
	echo json_encode($dbrow);}
}
else {echo('no lookasineventhistory');}
}


/* просмотр истории событий по ключевому слову и товару???*/

if(isset($_GET["lookasineventhistory_kw"])){
	$act = clearstring($link, $_GET["lookasineventhistory_kw"]);
	$uid = clearstring($link, $_GET["uid"]);
	$current_kw = clearstring($link, $_GET["current_keyword"]);
	$current_asin = clearstring($link, $_GET["current_asin"]);
	$sort = 'start_date';
	if ($current_asin == 'none') {$filter = "fire_id = '$uid'";} else
	$filter = "fire_id = '$uid' AND asin='$current_asin' AND keyword='$current_kw'";

	if ($act == 'lookasineventhistory_kw'){
$result = mysqli_query($link, "SELECT * FROM event_history WHERE $filter ORDER BY $sort" );

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {
	echo json_encode($dbrow);}
}
else {echo('no lookasineventhistory_kw');}
}

/* просмотр истории всех событий */

if(isset($_GET["lookasineventhistory_all"])){
	$act = clearstring($link, $_GET["lookasineventhistory_all"]);
	$uid = clearstring($link, $_GET["uid"]);
	$current_kw = clearstring($link, $_GET["current_keyword"]);
	$current_asin = clearstring($link, $_GET["current_asin"]);
	$sort = 'start_date';
	if ($current_asin == 'none') {$filter = "fire_id = '$uid'";} else
	$filter = "fire_id = '$uid'";

	if ($act == 'lookasineventhistory_all'){
$result = mysqli_query($link, "SELECT * FROM event_history WHERE $filter ORDER BY $sort" );

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {
	echo json_encode($dbrow);}
}
else {echo('no lookasineventhistory_all');}
}

/* добавляем новое ключевое слово к текущему товару*/ 
if(isset($_GET["addkeyword"])){	
	$act = clearstring($link, $_GET["addkeyword"]);
		if ($act == 'addkeyword'){
		
$uid = clearstring($link, $_GET["uid"]);
$keyword = clearstring($link, $_GET["keyword"]);
$asin = clearstring($link, $_GET["asin"]);
$kw_tracking = clearstring($link, $_GET["kw_tracking"]);
$mainscreen = clearstring($link, $_GET["mainscreen"]);
$notification = clearstring($link, $_GET["notification"]);
$choice = clearstring($link, $_GET["choice"]);
		
mysqli_query($link, "INSERT INTO keyword (fire_id, keyword, asin_tovar, mainscreen, kw_tracking, mail, achoice_tracking) VALUES ('$uid', '$keyword', '$asin', '$mainscreen', '$kw_tracking', '$notification', '$choice')");


//mysqli_query($link, "INSERT INTO client (user_name,user_email,user_password) VALUES ($name, $email, $pass)");
}
else {
	echo('Nichego');
}
}

/*добавляет нового пользователя*/
if(isset($_GET["action"])){	
	$act = clearstring($link, $_GET["action"]);
		if ($act == 'adduser'){
			
//echo json_encode ($act);

		if(isset($_GET["user_name"])){
$name = clearstring($link, $_GET["user_name"]);
$fire_email = clearstring($link, $_GET["fire_email"]);
$uid = clearstring($link, $_GET["uid"]);
$email = clearstring($link, $_GET["user_email"]);
$pass = clearstring($link, $_GET["user_pass"]);
		
mysqli_query($link, "INSERT INTO client (fire_email, fire_id,user_name,user_email,user_password) VALUES ('$fire_email', '$uid','$name', '$email', '$pass')");

/*
			if(isset($_POST)){	
			$user = clearstring($link, $_POST["user_name"]);}
*/
//echo json_encode ($act);

echo ($name);
echo ($email);
echo ($pass);
//mysqli_query($link, "INSERT INTO client (user_name,user_email,user_password) VALUES ($name, $email, $pass)");
}
else {
	echo('Nichego');
}
}
}


/*добавляет новый товар*/
if(isset($_GET["addasin"])){	
	$act = clearstring($link, $_GET["addasin"]);
		if ($act == 'addasin'){
		
$uid = clearstring($link, $_GET["uid"]);
$asin = clearstring($link, $_GET["asin"]);
$tag = clearstring($link, $_GET["tag"]);
$title = clearstring($link, $_GET["title"]);
$group = clearstring($link, $_GET["asin_group"]);
$image_src = clearstring($link, $_GET["image_src"]);
		
mysqli_query($link, "INSERT INTO tovar (fire_id,asin,tag,title,group_tovar,image_src) VALUES ('$uid','$asin', '$tag', '$title','$group', '$image_src')");


//mysqli_query($link, "INSERT INTO client (user_name,user_email,user_password) VALUES ($name, $email, $pass)");
}
else {
	echo('Nichego');
}
}

/* редактирование товара */ 

if(isset($_GET["updateasin"])){	
	$act = clearstring($link, $_GET["updateasin"]);
		if ($act == 'updateasin'){

$id_tovar =  clearstring($link, $_GET["id_tovar"]);		
$uid = clearstring($link, $_GET["uid"]);
$asin = clearstring($link, $_GET["asin"]);
$tag = clearstring($link, $_GET["tag"]);
$title = clearstring($link, $_GET["title"]);
$group = clearstring($link, $_GET["asin_group"]);
		
mysqli_query($link, "UPDATE tovar SET tag = '$tag',title = '$title', group_tovar = '$group' WHERE id_tovar = '$id_tovar'");


//mysqli_query($link, "INSERT INTO client (user_name,user_email,user_password) VALUES ($name, $email, $pass)");
}
else {
	echo('Nichego');
}
}

/* перезаписывает статус параметров ключевых слов */

if(isset($_GET["updatekwstatus"])){	
	$act = clearstring($link, $_GET["updatekwstatus"]);
		if ($act == 'updatekwstatus'){

		
$uid = clearstring($link, $_GET["uid"]);
$asin = clearstring($link, $_GET["asin"]);
$keyword = clearstring($link, $_GET["keyword"]);
$kw_tracking = clearstring($link, $_GET["kw_tracking"]);
$mainscreen = clearstring($link, $_GET["mainscreen"]);
$mail = clearstring($link, $_GET["mail"]);
$achoice_tracking = clearstring($link, $_GET["achoice_tracking"]);
$filter = "asin_tovar = '$asin' AND keyword='$keyword'";

		
mysqli_query($link, "UPDATE keyword SET kw_tracking = '$kw_tracking', mainscreen = '$mainscreen', mail = '$mail', achoice_tracking = '$achoice_tracking' WHERE $filter ");

}
else {
	echo('Nichego');
}
}


/*добавляет новый тег для товара */

if(isset($_GET["addasintag"])){	
	$act = clearstring($link, $_GET["addasintag"]);
		if ($act == 'addasintag'){
		
$uid = clearstring($link, $_GET["uid"]);
$tag = clearstring($link, $_GET["asin_tag"]);
		
mysqli_query($link, "INSERT INTO tag_group (fire_id, tag_name) VALUES ('$uid','$tag')");


//mysqli_query($link, "INSERT INTO client (user_name,user_email,user_password) VALUES ($name, $email, $pass)");
}
else {
	echo('Nichego');
}
}

/*добавляет новую группы для товара */ 

if(isset($_GET["addasingroup"])){	
	$act = clearstring($link, $_GET["addasingroup"]);
		if ($act == 'addasingroup'){
		
$uid = clearstring($link, $_GET["uid"]);
$group = clearstring($link, $_GET["asin_group"]);
		
mysqli_query($link, "INSERT INTO tovar_group (fire_id, name_group) VALUES ('$uid','$group')");


//mysqli_query($link, "INSERT INTO client (user_name,user_email,user_password) VALUES ($name, $email, $pass)");
}
else {
	echo('Nichego');
}
}


/*удаление записи из таблицы user*/
if(isset($_GET["action"])){	
		$act = clearstring($link, $_GET["action"]);
			if ($act == 'deleteuser'){

			
//echo json_encode ($act);

if(isset($_GET["asin_id"])){
$id = clearstring($link, $_GET["asin_id"]);
mysqli_query($link, "DELETE FROM client WHERE id_client='$id'");
}
else {
	echo('Nichego');
}
}
}

/* удаляет товар */

if(isset($_GET["action"])){	
		$act = clearstring($link, $_GET["action"]);
			if ($act == 'deleteasin'){

	$uid = clearstring($link, $_GET["uid"]);
	$id_tovar= clearstring($link, $_GET["asin_id"]);

mysqli_query($link, "DELETE FROM tovar WHERE id_tovar='$id_tovar'");
}
else {
	echo('Nichego');
}
}

if(isset($_GET["action"])){	
		$act = clearstring($link, $_GET["action"]);
			if ($act == 'deletekeyword'){

	$uid = clearstring($link, $_GET["uid"]);
	$id_keyword= clearstring($link, $_GET["id_keyword"]);

mysqli_query($link, "DELETE FROM keyword WHERE id_keyword='$id_keyword' AND fire_id = '$uid'");
}
else {
	echo('Nichego');
}
}


/* выводит весь список товаров */

if(isset($_GET["action"])){
	$act = clearstring($link, $_GET["action"]);
	$uid = clearstring($link, $_GET["uid"]);
	if ($act == 'lookasin'){
$result = mysqli_query($link, "SELECT * FROM tovar WHERE fire_id = '$uid'");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

echo json_encode($dbrow);
}
else {echo ('');}
}
}

/* выводит весь список тегов товара */

if(isset($_GET["lookasintag"])){
	$act = clearstring($link, $_GET["lookasintag"]);
	$uid = clearstring($link, $_GET["uid"]);
	$sort = clearstring($link, $_GET["sort"]);
	if ($act == 'lookasintag'){
$result = mysqli_query($link, "SELECT * FROM tag_group WHERE fire_id = '$uid' ORDER BY $sort");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

echo json_encode($dbrow);
}
else {echo ('');}
}
}


/* выводит весь список групп товара */

if(isset($_GET["group"])){
	$act = clearstring($link, $_GET["group"]);
	$uid = clearstring($link, $_GET["uid"]);
	$sort = clearstring($link, $_GET["sort"]);
	if ($act == 'lookgroup'){
$result = mysqli_query($link, "SELECT * FROM tovar_group WHERE fire_id = '$uid' ORDER BY $sort");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

echo json_encode($dbrow);
}
else {echo ('');}
}
}

/*просмотр параметров плана подписки*/
if(isset($_GET["lookplan"])){
	$act = clearstring($link, $_GET["lookplan"]);
	$plan = clearstring($link, $_GET["plan"]);
	if ($act == 'lookplan'){
$result = mysqli_query($link, "SELECT * FROM plan WHERE plan_name = '$plan'");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {echo ('нет записей в таблице plan');}
}
}

/*определение текущего плана подписки у пользователя*/
if(isset($_GET["lookplanname"])){
	$act = clearstring($link, $_GET["lookplanname"]);
	$uid = clearstring($link, $_GET["uid"]);
	if ($act == 'lookplanname'){
$result = mysqli_query($link, "SELECT plan_name FROM client WHERE fire_id = '$uid'");

$dbrow = [];

		if (mysqli_num_rows($result) > 0)
		{
				$row = mysqli_fetch_array($result);
		
		do {
			array_push($dbrow, $row);
		}
		while ($row = mysqli_fetch_array($result));

//echo (mysqli_num_rows($result));
echo json_encode($dbrow);
}
else {echo ('нет записей в таблице plan');}
}
}

/* редактирование плана подписки*/ 

if(isset($_GET["changeplan"])){	
	$act = clearstring($link, $_GET["changeplan"]);
		if ($act == 'changeplan'){

$uid = clearstring($link, $_GET["uid"]);

$new_plan = clearstring($link, $_GET["new_plan"]);
		
mysqli_query($link, "UPDATE client SET plan_name = '$new_plan' WHERE fire_id = '$uid' ");

}
else {
	echo('Nichego');
}
}

mysqli_close($link);

?>

