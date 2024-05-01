<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/Exception.php';
require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$name = $data['name'];
$tel = $data['tel'];
$msg = $data['msg'];

$body = '<p>Имя: <strong>' . $name . '</strong></p>' .
  '<p>Телефон: <strong>' . $tel . '</strong></p>' .
  '<p>Сообщение: <strong>' . $msg . '</strong></p>';

$mail = new PHPMailer(true);

try {
  $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->Host       = 'smtp.yandex.ru';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'clinicrostov-on-don@yandex.ru';
  $mail->Password   = 'wuenqrkdwloinzja';
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->SMTPOptions = array(
    'ssl' => array(
      'verify_peer' => false,
      'verify_peer_name' => false,
      'allow_self_signed' => true
    )
  );

  $mail->setFrom('clinicrostov-on-don@yandex.ru', $name);
  $mail->addAddress('rbru-metrika@yandex.ru');

  $mail->isHTML(true);
  $mail->Subject = 'Запись на прием';
  $mail->Body = $body;

  $mail->send();
  echo 'Сообщение отправлено успешно!';
} catch (Exception $e) {
  echo "'Сообщение не отправлено: {$mail->ErrorInfo}";
}
