# Generated by Django 3.0.6 on 2020-06-20 17:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('No', models.CharField(default='G0000', max_length=128)),
                ('start_p', models.CharField(default='未定', max_length=256)),
                ('end_p', models.CharField(default='未定', max_length=256)),
                ('departure_date', models.DateField(default=datetime.date.today)),
                ('danger_level', models.CharField(choices=[('0', '无风险'), ('1', '低风险'), ('2', '高风险'), ('3', '非常危险')], default='0', max_length=20)),
                ('_type', models.CharField(choices=[('0', '列车'), ('1', '航班')], default='1', max_length=20)),
                ('register_id', models.CharField(max_length=256)),
            ],
            options={
                'verbose_name': '班次',
                'verbose_name_plural': '班次',
            },
        ),
    ]
